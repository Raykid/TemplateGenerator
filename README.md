## 模板生成器是什么？
读取消息配置文件（XML或者JSON），以及不同语言的模板文件（文本），最终输出该语言的代码文件。我们可以简单地理解为：模板文件(语言相关部分) + 消息配置(语言无关部分) => 输出代码。

## 适用范围是什么？
适合于多端之间通讯协议的制定、WIKI文档的生成等。

## 目录结构
* [根目录]
	* configs(语言配置)
	    * [语言名称，如ts、java等]
	        * [config.json](#configjson)
	        * [[模板文件]](#模板文件)
	* messages(消息配置)
	    * [[消息配置文件]](#消息配置文件)

## 配置文件简单说明

### config.json

以json形式保存当前语言特殊的配置项，包括类型对照表、模板作用域、黑白名单。

* types：一个数组，用来配置当前语言所用到的各个数据类型的对照表，结构如下
    * from：数据类型转换前名称，如“double”，支持正则表达式匹配；
    * to：数据类型转换后名称，如“number”，支持正则表达式替换；
    * class：表示数据类型所属类别，目前可能的值有“basic”、“array”、“map”、“custom”。
* templates：一个数组，用来说明各个模板文件的作用域
    * field：作用域范围，直接对应消息配置中的作用域，另外还有一个值“global”，表示作用域是全局的（即包含所有作用域）；
    * file：表示所需的模板文件名；
    * saveName：表示生成的文件名称，可以使用变量以生成不同文件名，文件名的变量域和模板中的变量域相同。
* include：白名单，可选，如果配置了则消息生成器只会生成白名单中声明的消息配置文件；
* exclude：黑名单，可选，如果配置了则消息生成器会忽略黑名单中声明的消息配置文件；
* 如果某个消息配置文件在黑名单和白名单都存在，则优先以白名单为准；
* 举例：
```
{
  "types": [
    {
      "from": "byte",
      "to": "number",
      "class": "basic"
    },
    {
      "from": "short",
      "to": "number",
      "class": "basic"
    },
    {
      "from": "int",
      "to": "number",
      "class": "basic"
    },
    {
      "from": "long",
      "to": "string",
      "class": "basic"
    },
    {
      "from": "float",
      "to": "number",
      "class": "basic"
    },
    {
      "from": "double",
      "to": "number",
      "class": "basic"
    },
    {
      "from": "string",
      "to": "string",
      "class": "basic"
    },
    {
      "from": "boolean",
      "to": "boolean",
      "class": "basic"
    },
    {
      "from": "any",
      "to": "any",
      "class": "basic"
    },
    {
      "from": "(\\w+)\\[\\]",
      "to": "$1[]",
      "class": "array"
    },
    {
      "from": "{(\\w+):(\\w+)}",
      "to": "{[key:$1]:$2}",
      "class": "map"
    }
  ],
  "templates": [
    {
      "field": "global",
      "file": "MessageType.tpl",
      "saveName": "net/MessageType.ts"
    },
    {
      "field": "message",
      "file": "message.tpl",
      "saveName": "net/$a-{field}/$a-{name}Message.ts"
    },
    {
      "field": "response",
      "file": "type.tpl",
      "saveName": "net/$a-{field}/$a-{name}Response.ts"
    },
    {
      "field": "type",
      "file": "type.tpl",
      "saveName": "net/$a-{field}/$a-{name}.ts"
    }
  ],
  "include": [
	"abc.xml",
	"xyz.json"
  ],
  "exclude": [
	"extra.xml",
	"xyz.json"(这条会被忽略，因为白名单里也有)
  ]
}
```

### [模板文件]

生成最终代码所使用的模板。

* 语法：非命令语句可任意书写，命令语句被包在“$a-{}”结构的花括号内，例如“$a-{name}”表示最终代码中将用环境变量中的“name”字段的值替代这段语句，“$a-{for: i in 10}...$a-{end for}”表示将两个命令中间的“...”内容重复10次。详细语法规则请参考[Ares项目的Template实现部分](https://github.com/Raykid/Ares)；
* 环境变量
    * 根据模板所绑定的作用域不同会有所区别，进而取到的变量也略有区别
        * global作用域：根节点为消息配置的最顶级，也就是config节点，为一个字典（哈希表），内包含所有自定义作用域。因为是根作用域，所以整个生成过程仅会调用一次该模板，此时如果想遍历所有message作用域下的消息配置则需要在模板中使用for命令；
        * 自定义作用域：根节点为消息配置中config节点下级的节点。因为根节点在某个作用域内部，因此无法获取到其他作用域下的配置。消息配置中每有一个具体的消息体都会调用一次该模板，例如根据如下配置，如果message作用域下有A、B、C三个消息配置，那么最终会根据message.tpl模板生成三个文件：
            * net/message/AMessage.ts
            * net/message/BMessage.ts
            * net/message/CMessage.ts
```
{
  "field": "message",
  "file": "message.tpl",
  "saveName": "net/$a-{field}/$a-{name}Message.ts"
}
```
* 环境方法：为了书写模板的方便，提供几个工具性质的方法供调用
    * getConfigByName(field, name)：通过作用域名和消息体名获取消息体的配置数据；
    * getCustomNames(fields)：传入作用域数组，返回这些作用域中用到的自定义类型名称数组；
    * removeDuplicate(list)：字符串数组去重；
    * transformType(type)：传入数据类型名称（转换前），返回数据类型的定义。
* 举例

```typescript
/// <reference path="../../../../Libs/Freedom/vox/net/BasePBSocketCommand.ts"/>
$a-{for: msg in message}
/// <reference path="$a-{msg.field}/$a-{msg.name}Message.ts"/>
$a-{end for}
$a-{for: res in response}
$a-{if: res.protocol == "pbSocket"}
/// <reference path="$a-{res.field}/$a-{res.name}Response.ts"/>
$a-{end if}
$a-{end for}

/**
 * Created by TemplateGenerator.
 */
namespace net
{
	export class MessageType
	{
		/** 获取命令字典 */
		public static commandDict():{[name:string]:BaseNetCommandClass}
		{
			var dict:{[name:string]:BaseNetCommandClass} = {};
			$a-{for: msg in message}
			dict["$a-{msg.name}"] = net.message.$a-{msg.name}Command;
			$a-{end for}
			$a-{for: res in response}
			$a-{if: res.protocol == "pbSocket"}
			// 注册"$a-{res.comment}"返回对象
			vox.net.BasePBSocketCommand.registerResponse("$a-{res.name}", net.response.$a-{res.name}Response);
			$a-{end if}
			$a-{end for}
			return dict;
		}
		
		$a-{for: msg in message}
		/**
		 * $a-{msg.comment}
		 */
		public static $a-{msg.name}:string = "$a-{msg.name}";
		$a-{end for}
	}
	
    interface BaseNetCommandClass
    {
        new (...args):vox.net.BaseNetCommand;
    }
}
```


### [消息配置文件]

用于描述消息结构的配置文件，和输出的语言无关。目前支持JSON和XML两种结构。
* 基本结构说明
    * 根节点
        * 作用域节点
            * default节点（包含所有消息体都会继承的属性）
            * extra节点（一个列表，包含所有结构体不同的属性，可以覆盖继承的属性）
            * 算法：每有一个消息体配置，就生成一个default节点的副本，然后用extra节点覆盖该副本，从而生成一个完整的消息体配置。最终生成的作用域中并不包含default和extra这两个节点。
* 属性支持简单的变量，变量作用域与该消息体所在作用域相同；
* 属性支持赋值引用，运算符是“->”。如“response='response->$a-{name}'”表示response的值是response作用域下以变量“name”的值为key获取到的对象；
* 自定义属性：消息体配置支持自定义属性，自定义的属性在模板中可以取到；
* XML书写相对简洁，并且支持注释，因此推荐使用XML格式书写消息配置；
* XML格式举例

```XML
<config>
    <message>
        <default method="GET" response="response->$a-{name}" comment="" domainIndex="0"/>
        <extra>
            <!-- 获取平台活动列表接口 -->
            <item name="FetchFairyActivities" comment="获取平台活动列表接口" url="/wonderland/activity/fetchappactivities.vpage"/>
            <!-- 获取平台活动弹窗接口 -->
            <item name="FairyPopup" comment="获取平台活动弹窗接口" url="/wonderland/activity/popups.vpage">
				<field name="activityId" type="string" comment="游戏标识"/>
			</item>
        </extra>
    </message>

    <response>
        <default comment=""/>
        <extra>
            <!-- 获取平台活动列表接口 -->
            <item name="FetchFairyActivities" comment="获取平台活动列表接口">
                <field name="activities" type="FairyActivityVO[]" comment="平台活动列表"/>
            </item>
            <!-- 获取平台活动弹窗接口 -->
            <item name="FairyPopup" comment="获取平台活动弹窗接口">
                <field name="popups" type="FairyPopupVO[]" comment="平台活动弹窗列表"/>
            </item>
        </extra>
    </response>

    <type>
        <default comment=""/>
        <extra>
            <!-- 平台活动列表项 -->
            <item name="FairyActivityVO" comment="平台活动列表项">
                <field name="base" type="FairyActivityDetailVO" comment="基础信息，如果extra不单独约定则使用该项内容"/>
                <field name="extra" type="{string:FairyActivityDetailVO}" comment="活动白名单，以appName作为key，值是FairyActivityDetailVO类型"/>
            </item>
            <!-- 平台活动列表项详细数据 -->
            <item name="FairyActivityDetailVO" comment="平台活动列表项详细数据">
                <field name="name" type="string" comment="活动名称"/>
                <field name="icon" type="string" comment="活动图标地址"/>
                <field name="link" type="string" comment="活动跳转URL"/>
            </item>
            <!-- 平台活动弹窗数据 -->
            <item name="FairyPopupVO" comment="平台活动弹窗数据">
                <field name="id" type="int" comment="弹窗唯一标识"/>
                <field name="activityId" type="string" comment="活动ID"/>
                <field name="description" type="string" comment="描述"/>
                <field name="url" type="string" comment="图片地址"/>
                <field name="content" type="string" comment="文本内容"/>
                <field name="type" type="int" comment="弹窗类型  0 图片 1 文本"/>
                <field name="cycle" type="int" comment="0-一辈子一次	1-一天一次	2-每次登陆 一次"/>
                <field name="rank" type="int" comment="排序"/>
                <field name="startDatetime" type="int" comment="活动开始时间戳"/>
                <field name="endDatetime" type="int" comment="活动结束时间戳"/>
                <field name="extension" type="string" comment="json字符串，title：标题、determine_des：按钮文本、jump：跳转地址"/>
            </item>
        </extra>
    </type>
</config>
```

* JSON格式举例

```
{
	"message": {
		"default": {
			"pkg": "net.message",
			"fieldPkg": "net.type",
			"comment": "",
			"method": "GET",
			"response": "response->$a-{name}",
			"domainIndex": 0
		},
		"extra": [
			{
				"name": "GetVideoList",
				"comment": "视频课程列表",
				"url": "/afenti/api/video/list.vpage",
				"method": "POST"
			}
		]
	},
	"response": {
		"default": {
			"comment": "",
			"pkg": "net.response",
			"fieldPkg": "net.type"
		},
		"extra": [
			{
				"name": "GetVideoList",
				"comment": "视频课程列表返回",
				"fields": [
					{
						"name": "hasOpened",
						"type": "boolean",
						"comment": "是否开通了服务"
					},
					{
						"name": "catalog",
						"type": "VideoListInfo[]",
						"comment": "视频目录"
					}
				]
			}
		]
	},
	"type": {
		"default": {
			"comment": "",
			"pkg": "net.type",
			"fieldPkg": "net.type"
		},
		"extra": [
			{
				"name": "VideoListInfo",
				"comment": "视频目录",
				"fields": [
					{
						"name": "id",
						"type": "string",
						"comment": "目录ID"
					},
					{
						"name": "name",
						"type": "string",
						"comment": "目录题目"
					},
					{
						"name": "lessons",
						"type": "VideoInfo[]",
						"comment": "课时详情列表"
					}
				]
			},
			{
				"name": "VideoInfo",
				"comment": "视频课程目录",
				"fields": [
					{
						"name": "id",
						"type": "string",
						"comment": "课时ID"
					},
					{
						"name": "name",
						"type": "string",
						"comment": "课时名称"
					},
					{
						"name": "imgUrl",
						"type": "string",
						"comment": "课时缩略图"
					},
					{
						"name": "isFree",
						"type": "boolean",
						"comment": "是否是免费视频"
					}
				]
			}
		]
	}
}
```
