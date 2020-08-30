cd openlane_working_dir/openlane
# shellcheck disable=SC2046
PDK_ROOT=/home/khaledsoli111/openlane-cloud/backend/openlane_working_dir/pdks
DOCKER_ID=$(sudo docker run --cpus="$1" -m "$2" --rm --name="$3" -div $(pwd):/openLANE_flow -v $PDK_ROOT:$PDK_ROOT -e PDK_ROOT=$PDK_ROOT -u $(id -u $USER):$(id -g $USER) openlane:rc2)
case "$3" in
normal)
 sudo docker exec "$DOCKER_ID" python3 run_designs.py --designs "$4" --tag "$5" --threads 1 --clean
  ;;
exploratory)
  sudo docker exec "$DOCKER_ID" python3 run_designs.py --designs "$4" --tag "$5" --regression "$6" --threads 4 --htmlExtract --clean
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
