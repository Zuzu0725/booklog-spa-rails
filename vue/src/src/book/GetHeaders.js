const GetHeaders = class {
    /**
     * uidを取得
     * @return { string }
     */
    getUid() {
        const uid = window.localStorage.getItem('uid')
        return uid
    }

    /**
     * access-tokenを取得
     * @return { string }
     */
    getAccessToken() {
        const accessToken = window.localStorage.getItem('access-token')
        return accessToken
    }

    /**
     * clientを取得
     * @return { string }
     */
    getClient() {
        const client = window.localStorage.getItem('client')
        return client
    }
}

export default GetHeaders