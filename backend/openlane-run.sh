cd openlane
# shellcheck disable=SC2046
DOCKER_ID=$(docker run -div $(pwd)/openlane:/openLANE_flow -v $(pwd)/pdks/open_pdks/sky130/pdks:/openLANE_flow/pdks -u $(id -u $USER):$(id -g $USER) openlane:rc1)
docker exec "$DOCKER_ID" ./flow.tcl -design "$1"
docker stop "$DOCKER_ID"