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
git checkout 3f310bcc264df0194b9f7e65b83c59759bb27480
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
git checkout 52f78fa08f91503e0cff238979db4589e6187fdf
make
make install-local
./configure --with-sky130-source=$PDK_ROOT/skywater-pdk/libraries --with-sky130-local-path=$PDK_ROOT && \
	cd sky130
	make
	make install-local