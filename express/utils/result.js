const {CODE_SUCCESS, CODE_FILED} = require("./constent");

class Result {
    constructor(data,message,code) {
        this.ok = null;
        this.data = data || null
        this.message = message || ""
        this.code = code || null
    }
    json(res) {
        return res.json(this.createResult())
    }
    createResult() {
        if (!this.code) {
            this.code = CODE_SUCCESS
        }
        if (!this.data) {
            this.data = null
        }
        if (!this.message) {
            this.message = this.code === CODE_SUCCESS ? '成功' : '失败'
        }

        return {
            ok: this.ok,
            code: this.code,
            message: this.message,
            data: this.data
        }
    }
    success(res) {
        this.ok = true;
        this.code = CODE_SUCCESS
        return this.json(res)
    }
    fail(res) {
        this.ok = false;
        this.code = CODE_FILED
        return this.json(res)
    }
}

module.exports = Result