cd openlane_working_dir
git clone https://github.com/efabless/openlane.git --branch develop
cd openlane/docker_build
make merge
cd ..
export PDK_ROOT=/home/ks/openlane-cloud/backend/openlane_working_dir/pdks
cd  $PDK_ROOT
git clone https://github.com/google/skywater-pdk.git
cd skywater-pdk
git checkout 4e5e318e0cc578090e1ae7d6f2cb1ec99f363120
git submodule update --init libraries/sky130_fd_sc_hd/latest
make sky130_fd_sc_hd
cd $PDK_ROOT
git clone https://github.com/efabless/open_pdks.git -b develop
cd open_pdks
make
make install-local