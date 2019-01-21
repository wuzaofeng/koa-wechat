const { getWechat } = require('../wechat/index')
const util = require('../utils/util')

exports.getSignature = async (url) => {
  const client = getWechat()
  const data = await client.fetchAccessToken()
  const token = data.access_token
  const { ticket } = await client.fetchTicket(token)
  let params = util.sign(ticket, url)
  params.appId = client.appID
  return params
}