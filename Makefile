DEPLOY_SERVER:=root@120.27.218.186
DEPLOY_PORT:=20201
DEPLOY_PATH:=/data/agent

TEST_DEPLOY_SERVER:=root@zsystem.com.cn
TEST_DEPLOY_PORT:=44
TEST_DEPLOY_PATH:=/home/myne/zsystem

.PHONY: upload
upload:
	@rsync -e "ssh -p ${DEPLOY_PORT}" ${PROJECT} ${DEPLOY_SERVER}:${DEPLOY_PATH}/${PROJECT}
	@rsync -qur -e "ssh -p ${DEPLOY_PORT}" etc/ ${DEPLOY_SERVER}:${DEPLOY_PATH}/etc/
	@ssh -p ${DEPLOY_PORT} ${DEPLOY_SERVER} "cat ${DEPLOY_PATH}/runtime/${PROJECT}.pid|xargs kill -1"

.PHONY: deploy
deploy: linux upload

.PHONE: stop
stop:
	@cat runtime/*.pid|xargs kill -9

.PHONY: upload_test
upload_test:
	@rsync -e "ssh -p ${TEST_DEPLOY_PORT}" ${PROJECT} ${TEST_DEPLOY_SERVER}:${TEST_DEPLOY_PATH}/${PROJECT}
	@rsync -qur -e "ssh -p ${TEST_DEPLOY_PORT}" etc/ ${TEST_DEPLOY_SERVER}:${TEST_DEPLOY_PATH}/etc/
	@ssh -p ${TEST_DEPLOY_PORT} ${TEST_DEPLOY_SERVER} "cat ${DEPLOY_PATH}/runtime/${PROJECT}.pid|xargs kill -1"

.PHONY: deploy_test
deploy_test: linux upload_test
