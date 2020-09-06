while [ $# -gt 0 ]; do
  case "$1" in
    --type=*)
      type="${1#*=}"
      ;;
    --tag=*)
      tag="${1#*=}"
      ;;
    --design-dir=*)
      design_dir="${1#*=}"
      ;;
    --design-name=*)
      design_name="${1#*=}"
      ;;
    --regression-script=*)
      regression_script="${1#*=}"
      ;;
    --threads=*)
      threads="${1#*=}"
      ;;
    --cpus=*)
      cpus="${1#*=}"
      ;;
    --memory=*)
      memory="${1#*=}"
      ;;
    *)
      printf "* Invalid argument Passed *"
      exit 1
  esac
  shift
done
PDK_ROOT=/home/ks/openlane-cloud/backend/openlane_working_dir/pdks

cd openlane_working_dir/openlane || exit
DOCKER_ID=$(sudo docker run --rm --cpus="$cpus" --memory="$memory" --name="$tag" -div  $(pwd):/openLANE_flow -v $PDK_ROOT:$PDK_ROOT -e PDK_ROOT=$PDK_ROOT -u $(id -u $USER):$(id -g $USER) openlane:cloud)

case "$type" in
regular)
  echo "docker exec "$DOCKER_ID" ./flow.tcl -design "$design_dir" -tag "$tag""
  sudo docker exec "$DOCKER_ID" ./flow.tcl -design "$design_dir" -tag "$tag"
  sudo docker exec "$DOCKER_ID" ./scripts/report/report.sh "$design_dir/$tag" "$design_name"
  ;;
exploratory)
  sudo docker exec "$DOCKER_ID" python3 run_designs.py --designs "$design_dir" --tag "$tag" --regression "$regression_script" --threads "$threads" --disable_timestamp --clean
  ;;
*)
  printf "*     Invalid run type    *"
  exit 1
  ;;
esac

sudo docker stop "$DOCKER_ID"
exit 0
