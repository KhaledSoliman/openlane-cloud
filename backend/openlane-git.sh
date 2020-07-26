cd openlane_working_dir
cd pdks
git clone https://github.com/google/skywater-pdk.git
cd skywater-pdk
git checkout 4e5e318e0cc578090e1ae7d6f2cb1ec99f363120
git submodule update --init libraries/sky130_fd_sc_hd/latest
make sky130_fd_sc_hd
cd ..
git clone https://github.com/efabless/open_pdks.git
cd open_pdks
git checkout c2fec9fe64146000236dd807165b80b6a8b82b89
make
make install-local
cd ..
cd .