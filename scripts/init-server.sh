# ========================================================================
# ubuntu 22.04 commands to setup server
sudo apt update
# ========================================================================
# install caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# EDIT config
# sudo nano /etc/caddy/Caddyfile

# Restart/Reload caddy
# sudo systemctl reload caddy
# ========================================================================
# setup swap
# https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-22-04
sudo fallocate -l 20G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
cat /proc/sys/vm/swappiness
cat /proc/sys/vm/vfs_cache_pressure
sudo sysctl vm.swappiness=10
sudo sysctl vm.vfs_cache_pressure=50

# make swap settings permanent
sudo cp /etc/sysctl.conf /etc/sysctl.conf.bak
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf

# check swap
free -h
sudo swapon --show
# ========================================================================
# https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 20.11.1
# ========================================================================
npm install -g pm2
pm2 install pm2-logrotate
npm install -g pnpm
# ========================================================================
# ANSIBLE FIXES
sudo ln -s $(which npm) /usr/bin/npm
sudo ln -s $(which node) /usr/bin/node
sudo ln -s $(which pm2) /usr/bin/pm2
sudo ln -s $(which pnpm) /usr/bin/pnpm
# ========================================================================
# not required caddy handles them all
# sudo ufw allow 80 && sudo ufw allow 443
# sudo apt-get install --assume-yes libcap2-bin
# sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\`` 
# # sudo setcap cap_net_bind_service=+eip $(which caddy)
# ========================================================================





