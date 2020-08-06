cd openlane_working_dir/openlane
# shellcheck disable=SC2046
DOCKER_ID=$(
  sudo docker run -div $(pwd):/openLANE_flow -v $PDK_ROOT:$PDK_ROOT -e PDK_ROOT=$PDK_ROOT -u $(id -u $USER):$(id -g $USER) openlane:rc2
)
docker exec "$DOCKER_ID" ./flow.tcl -design "$1"
docker stop "$DOCKER_ID"
