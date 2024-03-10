# ansible-playbook -i "$CADDY_HOST_IP," -u ubuntu --private-key ./key.pem ./playbook.yml -v
ansible-playbook -i "$CADDY_HOST_IP," -u ubuntu --private-key ./key.pem ./git-clone.yml -v

# docker pull ansible/ansible

# docker run --rm -it \
#   -v /path/to/ansible/files:/ansible:Z \
#   -v /path/to/ssh/key:/root/.ssh/id_rsa:ro \
#   --env ANSIBLE_HOST_KEY_CHECKING=False \
#   ansible/ansible:latest \
#   ansible-playbook -i 'host1,host2,...' \
#                   -u ubuntu \
#                   --private-key /root/.ssh/id_rsa \
#                   /ansible/playbook.yml