cd openlane.alpha-16
# shellcheck disable=SC2046
DOCKER_ID=$(docker run -div $(pwd):/openLANE_flow -u $(id -u $USER):$(id -g $USER) openlane:develop)
docker exec "$DOCKER_ID" ./flow.tcl -design "$1"
docker stop "$DOCKER_ID"