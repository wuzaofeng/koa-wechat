const ejs = require('ejs')
const tpl = `
<xml>
  <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
  <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
  <CreateTime><%= createTime %></CreateTime>
  <% if(msgType === 'text') { %>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[<%- content %>]]></Content>
  <% } else if (msgType === 'image') {%>
    <Image>
      <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
    </Image>
  <% } else if (msgType === 'voice') {%>
    <voice>
      <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
    </voice>  
  <% } else if (msgType === 'video') {%>
    <Video>
      <MediaId><![CDATA[<%= media_id %>]]></MediaId>
      <Title><![CDATA[<%= title %>]]></Title>
      <Description><![CDATA[<%= description %>]]></Description>
    </Video>
  <% } else if (msgType === 'music') {%>
    <Music>
      <Title><![CDATA[TITLE]]></Title>
      <Description><![CDATA[DESCRIPTION]]></Description>
      <MusicUrl><![CDATA[MUSIC_Url]]></MusicUrl>
      <HQMusicUrl><![CDATA[HQ_MUSIC_Url]]></HQMusicUrl>
      <ThumbMediaId><![CDATA[media_id]]></ThumbMediaId>
    </Music>
  <% } else if (msgType === 'news') {%>
    <ArticleCount>1</ArticleCount>
    <Articles>
      <% content.forEach(function(item) {  %>
        <item>
          <Title><![CDATA[<%= item.title %>]]></Title>
          <Description><![CDATA[<%= item.description %>]]></Description>
          <PicUrl><![CDATA[<%= item.picurl %>]]></PicUrl>
          <Url><![CDATA[<%= item.url %>]]></Url>
        </item>
      <% }) %>
    </Articles>
  <% } %>
</xml> `

const compiled = ejs.compile(tpl)

module.exports = compiled