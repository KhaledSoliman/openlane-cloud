cd openlane_working_dir/openlane
# shellcheck disable=SC2046
PDK_ROOT=/home/ks/openlane-cloud/backend/openlane_working_dir/pdks
DOCKER_ID=$(sudo docker run --rm --name="$3" -div $(pwd):/openLANE_flow -v $PDK_ROOT:$PDK_ROOT -e PDK_ROOT=$PDK_ROOT -u $(id -u $USER):$(id -g $USER) openlane:cloud)
case "$1" in
normal)
  sudo docker exec "$DOCKER_ID" python3 run_designs.py --designs "$2" --tag "$3" --threads 1 --clean
  ;;
exploratory)
  sudo docker exec "$DOCKER_ID" python3 run_designs.py --designs "$2" --tag "$3" --regression "$4" --threads 4 --htmlExtract --clean
  ;;
*)
  echo "unknown run type"
  exit 1
  ;;
esac
cd regression_results
rename -v "s/${3}_\d{2}_\d{2}_\d{4}_\d{2}_\d{2}/${3}/" "$3"_*.csv
sudo docker stop "$DOCKER_ID"
exit 0
