mkdir openlane_working_dir
mkdir openlane_working_dir/pdks
export PDK_ROOT=/home/ks/openlane-cloud/backend/openlane_working_dir/pdk
export IMAGE_NAME=openlane:cloud
cd openlane_working_dir
git clone https://github.com/efabless/openlane.git --branch develop
cd openlane
make clone-skywater-pdk
make all-skywater-libraries
make open_pdks
make openlane