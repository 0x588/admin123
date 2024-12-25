DEPLOY_SERVER:=root@120.27.218.186
DEPLOY_PORT:=20201
DEPLOY_PATH:=/data/agent

TEST_DEPLOY_SERVER:=root@zsystem.com.cn
TEST_DEPLOY_PORT:=44
TEST_DEPLOY_PATH:=/home/myne/zsystem

.PHONY: upload
upload:
	@rsync -qur -e "ssh -p ${DEPLOY_PORT}" dist/ ${DEPLOY_SERVER}:${DEPLOY_PATH}/

.PHONY: upload_test
upload_test:
	rsync -qur -e "ssh -p ${TEST_DEPLOY_PORT}" dist/ ${TEST_DEPLOY_SERVER}:${TEST_DEPLOY_PATH}/
