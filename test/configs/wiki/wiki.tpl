<h3>所有返回都会拥有的通用字段</h3>
<table class="confluenceTable">
  <tbody>
    <tr>
      <th class="confluenceTh">字段</th>
      <th class="confluenceTh">类型</th>
      <th class="confluenceTh">说明</th>
	</tr>
    <tr>
      <td class="confluenceTd" colspan="1"><pre>success</pre></td>
      <td class="confluenceTd" colspan="1">boolean</td>
      <td class="confluenceTd" colspan="1">返回值时表示是否成功</td>
    </tr>
    <tr>
      <td class="confluenceTd" colspan="1"><pre>errorCode</pre></td>
      <td class="confluenceTd" colspan="1">int</td>
      <td class="confluenceTd" colspan="1">success是false时表示错误码</td>
    </tr>
    <tr>
      <td class="confluenceTd" colspan="1"><pre>info</pre></td>
      <td class="confluenceTd" colspan="1">string</td>
      <td class="confluenceTd" colspan="1">success是false时表示错误信息</td>
    </tr>
    <tr>
      <td class="confluenceTd" colspan="1"><pre>sys_time</pre></td>
      <td class="confluenceTd" colspan="1">long</td>
      <td class="confluenceTd" colspan="1">消息返回时刻的服务器时间戳，目前只有PHP服务器支持此字段的统一返回，请注意</td>
    </tr>
  </tbody>
</table>
$a-{for: msg in message}
<h3>$a-{$index + 1}、$a-{msg.comment}：$a-{msg.name}</h3>
<p>1）请求路径：$a-{msg.method} $a-{msg.url}</p>
<p>2）请求参数：$a-{if: msg.fields.length <= 0}无$a-{end if}</p>
$a-{if: msg.fields.length > 0}
<table class="confluenceTable">
  <tbody>
    <tr>
      <th class="confluenceTh">
        <div class="tablesorter-header-inner">
          <div class="tablesorter-header-inner">
            <div class="tablesorter-header-inner">字段</div>
          </div>
        </div>
      </th>
      <th class="confluenceTh">
        <div class="tablesorter-header-inner">
          <div class="tablesorter-header-inner">
            <div class="tablesorter-header-inner">类型</div>
		  </div>
        </div>
      </th>
      <th class="confluenceTh">
        <div class="tablesorter-header-inner">
          <div class="tablesorter-header-inner">
            <div class="tablesorter-header-inner">说明</div>
		  </div>
        </div>
      </th>
    </tr>
	$a-{for: field in msg.fields}
    <tr>
      <td class="confluenceTd" colspan="1">$a-{field.name}</td>
      <td class="confluenceTd" colspan="1">$a-{transformType(field.type).to}</td>
      <td class="confluenceTd" colspan="1"><pre>$a-{field.comment}</pre></td>
    </tr>
	$a-{end for}
  </tbody>
</table>
$a-{end if}
<p>3）返回类型：<span style="color: #000000;">$a-{msg.response.name}</span></p>
<p>4）返回参数：</p>
<table class="confluenceTable">
  <tbody>
    <tr>
      <th class="confluenceTh">字段</th>
      <th class="confluenceTh">类型</th>
      <th class="confluenceTh">说明</th>
	</tr>
	$a-{for: field in msg.response.fields}
    <tr>
      <td class="confluenceTd">
        <pre>$a-{field.name}</pre></td>
      <td class="confluenceTd">
		$a-{(function(){
			return getTypeStr(field);
			
			function getTypeStr(field)
			{
				var type = transformType(field.type);
				// 基础类型
				if(type.class == "basic") return type.to;
				// 其他类型
				var config = getConfigByName(type.customName);
				var tempArr = [];
				if(config.fields != null)
				{
					for(var i = 0, len = config.fields.length; i < len; i++)
					{
						var subField = config.fields[i];
						tempArr.push(`<tr>
						  <td class="confluenceTd" colspan="1"><pre>${subField.name}</pre></td>
						  <td class="confluenceTd" colspan="1">${getTypeStr(subField)}</td>
						  <td class="confluenceTd" colspan="1">${subField.comment}</td>
						</tr>`);
					}
				}
				var res = `<table class="confluenceTable">
				  <tbody>
					<tr>
					  <th class="confluenceTh">字段</th>
					  <th class="confluenceTh">类型</th>
					  <th class="confluenceTh">说明</th>
					</tr>
					${tempArr.join("")}
				  </tbody>
				</table>`;
				// 复杂类型、数组或Map类型
				if(type.class == "custom" || type.class == "array" || type.class == "map")
				{
					return "<pre><span>" + type.to + "</span></pre>" + res;
				}
			}
		})()}
      </td>
      <td class="confluenceTd">$a-{field.comment}</td>
	</tr>
	$a-{end for}
  </tbody>
</table>
$a-{end for}