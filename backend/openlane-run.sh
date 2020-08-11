cd openlane_working_dir/openlane
# shellcheck disable=SC2046
PDK_ROOT=/home/khaledsoli111/openlane-cloud/backend/openlane_working_dir/pdks
echo $PDK_ROOT
DOCKER_ID=$(
  sudo docker run -div $(pwd):/openLANE_flow -v $PDK_ROOT:$PDK_ROOT -e PDK_ROOT=$PDK_ROOT -u $(id -u $USER):$(id -g $USER) openlane:rc2
)
sudo docker exec "$DOCKER_ID" ./flow.tcl -design "$1" -overwrite -tag "$2"
sudo docker stop "$DOCKER_ID"
