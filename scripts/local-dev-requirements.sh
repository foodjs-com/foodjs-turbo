# ========================================================================
# install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# - Run these two commands in your terminal to add Homebrew to your PATH:
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/k/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"

# ========================================================================

# install ansible
brew install ansible
ansible --version

# ========================================================================