package com.voxlearning.utopia.service.wonderland.api.vo.dreamcareer.$a-{field};

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;

import com.voxlearning.alps.spi.common.JsonStringDeserializer;
import com.voxlearning.alps.lang.convert.SafeConverter;
import com.voxlearning.utopia.service.wonderland.api.vo.AbstractRequest;
import com.voxlearning.utopia.service.wonderland.api.vo.dreamcareer.type.*;
import lombok.Getter;
import lombok.Setter;
	
/**
 * $a-{comment}
 * $a-{name}消息体
 * 
 * @author TemplateGenerator
 * @serial
 */
@Getter
@Setter
public class $a-{name}Request extends AbstractRequest<$a-{name}Request> implements Serializable {
	private static final long serialVersionUID = 0L;

	$a-{for: field in fields}
	// $a-{field.comment}
	private $a-{field.type.to} $a-{field.name};
	$a-{end for}

}
