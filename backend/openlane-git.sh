cd openlane_working_dir
eval "$(ssh-agent -s)"
ssh-add -K ./efabless
git clone git@github.com:efabless/openlane --branch rc2
cd openlane/docker_build
make merge
cd ..
export PDK_ROOT=/Users/khaled/WebstormProjects/openlane-cloud/backend/openlane_working_dir/pdks
cd  $PDK_ROOT
git clone git@github.com:google/skywater-pdk.git
cd skywater-pdk
git checkout 4e5e318e0cc578090e1ae7d6f2cb1ec99f363120
git submodule update --init libraries/sky130_fd_sc_hd/latest
make sky130_fd_sc_hd
cd $PDK_ROOT
git clone git@github.com:efabless/open_pdks.git -b rc2
cd open_pdks
make
make install-local