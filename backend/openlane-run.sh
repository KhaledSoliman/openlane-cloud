cd openlane_working_dir/openlane
# shellcheck disable=SC2046
PDK_ROOT=/home/khaledsoli111/openlane-cloud/backend/openlane_working_dir/pdks
DOCKER_ID=$(
  sudo docker run --rm --name="$3" -div $(pwd):/openLANE_flow -v $PDK_ROOT:$PDK_ROOT -e PDK_ROOT=$PDK_ROOT -u $(id -u $USER):$(id -g $USER) openlane:rc2
)
case "$1" in
normal)
  sudo docker exec "$DOCKER_ID" ./flow.tcl -design "$2" -overwrite -tag "$3"
  ;;
exploratory)
  sudo docker exec "$DOCKER_ID" python3 run_designs.py --designs "$2" --tag "$3" --regression "$4" --clean
  ;;
*)
  echo "unknown run type"
  exit 1
  ;;
esac
sudo docker stop "$DOCKER_ID"
exit 0
