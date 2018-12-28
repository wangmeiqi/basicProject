 <template>
     <div>
         <button @click="cl">点击</button>
         <button @click="send">请求数据</button>
     </div>
</template>
 
<script>
    import API from 'api/http'
    import XMPP from 'api/xmpp'
    var connection  = null
    export default {
        data(){
            return {
                connection:null,
                msg:null
            }
        },
        methods:{
            send(){
                alert(1)
                $.ajax({
                    type:"post",
                    url: API.xmpphttp +  "/friends/page",
                    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                    dataType : 'JSON',
                    success:function(data){
//                        console.log(data)
                    },
                    data:{
                        userId : 10000009,
                        pageIndex : 0,
                        status:2,
                        pageSize : 10
                    }
                });
            },
            cl(){
                this.msg = $msg({
                    to: '10005@192.168.9.50', 
                    from: '10000009@192.168.9.50', 
                    type: 'get'
                }).c("body", null, '3333');
                this.connection.send(this.msg.tree());
            },
            onMessage(){
//                console.log(this.msg)
                // 解析出<message>的from、type属性，以及body子元素
                var from = this.msg.nodeTree.getAttribute('from');
                var type = this.msg.nodeTree.getAttribute('type');
                var elems = this.msg.nodeTree.getElementsByTagName('body');
//                console.log(from)
//                console.log(type)
//                console.log(elems)
                if (type == "get" && elems.length > 0) {
                    var body = elems[0];
//                    console.log(Strophe.getText(body));
                }
//                return true;
            }
        },
        created(){
            this.connection = new Strophe.Connection(API.xmpp);
            console.log("xmpp开始链接-----");
            this.connection.connect('10011@219.143.207.136','10011',function(status){
                console.log(status)
            })
            //this.connection.xmlOutput = function(elem) {
              //  console.log(XMPP.parsingXML(elem))
//                console.log(elem)
//                console.log(elem.getElementsByTagName("message")[0].getElementsByTagName("body")[0].innerHTML)
         //   };
//          setInterval(()=>{
//                this.msg = $msg({
//                    to: '10000007@192.168.9.50', 
//                    from: '10000009@192.168.9.50', 
//                    type: 'get'
//                }).c("body", null, '3333');
//                this.msg = $msg({
//                    to : '10000007@192.168.9.50', 
//                    type : 'chat',
////                    from: '10000009@192.168.9.50',
//                    id : '748ffd01fba24bd987e9ba8ff2dc2adc',
//                    xmlns: 'jabber:client'
//                }).c("body", null, '{"messageId":"748ffd01fba24bd987e9ba8ff2dc2adc","fromUserId":"10000009","fromUserName":"www","content":"999999999999999","timeSend":1526644810,"type":1,"id":"748ffd01fba24bd987e9ba8ff2dc2adc"}').c("request", {
//                    xmlns : "urn:xmpp:receipts"
//                }, null);
    //            this.connection.send(XMPP.sendMsg('10000007@192.168.9.50','10000009','www',4545454545).tree());
//          },1000)
        },
        watch: {
            msg() {
//                this.connection.addHandler(this.onMessage(), null,'message', null, null, null);
            }
        }
    }
</script>
 
<style scoped>
</style>