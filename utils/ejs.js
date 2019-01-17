const ejs = require('ejs')
let tpl = `
<xml>
 <ToUserName><![CDATA[<%-toUsername%>]]></ToUserName>
 <FromUserName><![CDATA[<%-fromUsername%>]]></FromUserName>
 <CreateTime><%=createTime%></CreateTime>
 <MsgType><![CDATA[<%=msgType%>]]></MsgType>
 <% if (msgType === 'text') { %>
 <Music>
 <Title><![CDATA[<%-content.title%>]]></Title>
 <Description><![CDATA[<%-content.description%>]]></Description>
 <MusicUrl><![CDATA[<%-content.musicUrl || content.url %>]]></MusicUrl>
 <HQMusicUrl><![CDATA[<%-content.hqMusicUrl || content.hqUrl %>]]></HQMusicUrl>
 </Music>
 <% } else if (msgType === 'voice') { %>
 <Voice>
 <MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>
 </Voice>
 <% } else if (msgType === 'image') { %>
 <Image>
 <MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>
 </Image>
 <% } else if (msgType === 'video') { %>
 <Video>
 <MediaId><![CDATA[<%-content.mediaId%>]]></MediaId>
 <Title><![CDATA[<%-content.title%>]]></Title>
 <Description><![CDATA[<%-content.description%>]]></Description>
 </Video>
 <% } else { %>
 <Content><![CDATA[<%-content%>]]></Content>
 <% } %>
</xml>
`
const compiled = ejs.compile(tpl)

module.exports = compiled