mkdir openlane_working_dir
mkdir openlane_working_dir/pdks
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
git submodule update --init libraries/sky130_fd_sc_hs/latest
make sky130_fd_sc_hs
git submodule update --init libraries/sky130_fd_sc_ms/latest
make sky130_fd_sc_ms
git submodule update --init libraries/sky130_fd_sc_ls/latest
make sky130_fd_sc_ls
git submodule update --init libraries/sky130_fd_sc_hdll/latest
make sky130_fd_sc_hdll
cd $PDK_ROOT
git clone https://github.com/efabless/open_pdks.git -b rc2
cd open_pdks
make
make install-local