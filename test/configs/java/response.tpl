package com.voxlearning.utopia.service.wonderland.api.vo.dreamcareer.$a-{field};

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.io.Serializable;
import com.voxlearning.utopia.service.wonderland.api.entity.*;
import com.voxlearning.utopia.service.wonderland.api.vo.AbstractResponse;
import com.voxlearning.alps.spi.common.JsonStringSerializer;
import com.voxlearning.utopia.service.wonderland.api.vo.dreamcareer.type.*;
import lombok.Getter;
import lombok.Setter;

/**
 * $a-{comment}
 * 
 * @author TemplateGenerator
 * @serial
 */
@Getter
@Setter
public class $a-{name}Response extends AbstractResponse<$a-{name}Response> implements Serializable {
	private static final long serialVersionUID = 0L;

	$a-{for: field in fields}
	private $a-{field.type.to} $a-{field.name};	// $a-{field.comment}
	$a-{end for}

	$a-{for: field in fields}
    public $a-{name}Response add$a-{(function(str){
		return str.charAt(0).toUpperCase() + str.substr(1);
	})(field.name)}($a-{field.type.to} $a-{field.name}){
    	this.$a-{field.name} = $a-{field.name};
    	return this;
    }
    $a-{end for}

    public static $a-{name}Response successCreate() {
         return new $a-{name}Response().successResponse();
    }
}
