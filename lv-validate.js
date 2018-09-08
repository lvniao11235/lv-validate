function Validate(id) {
    if (arguments.length != 1) {
        throw new Error("Argument is required");
    }
    this.errors = [];
	this.errorControls = [];
    this.id = id;
    this.container = $("#" + id);
}

Validate.prototype = {
    constructor: Validate,
    rules: [
        "required",
		"minLength",
		"maxLength",
		"integer",
		"decimal",
		"email",
		"ip",
		"url",
		"pattern"
    ],
    rulesCallback: {
        messages: {
            required: 'The %s field is required.',
			minLength: 'The %s field must be at least %d characters in length.',
			maxLength: 'The %s field must not exceed %d characters in length.',
			integer: 'The %s field must contain only integer.',
			decimal: 'The %s field must contain only decimal.',
			email: 'The %s field must contain a valid email address.',
			ip: 'The %s field must contain a valid IP.',
			url: 'The %s field must contain a valid URL.',
			pattern: 'The %s field must match %p'
        },
		regexs: {
			integer: /^[+-]?[0-9]+$/,
			decimal: /^[+-]?[0-9]+[.]?[0-9]+$/,
			email: /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
			ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
			url: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
		},
        required: function (control) {
            var value = control.value.trim();
            if ((control.type === "checkbox") || (control.type === "radio")) {
                if($("input[name='" + control.name + "']:checked").val() != undefined){
					return "";
				}
            }
            else if (value && value.length > 0) {
                return "";
            }
            return this.messages.required.replace("%s", control.name);
        },
		minLength: function(control){
			var value = Object(control.value).toString();
			var min = $(control).attr("min_length");
			if(value.length >= min){
				return "";
			}
			return this.messages.minLength.replace("%s", control.name).replace("%d", min);
		},
		maxLength: function(control){
			var value = Object(control.value).toString();
			var max = $(control).attr("max_length");
			if(value.length <= max){
				return "";
			}
			return this.messages.minLength.replace("%s", control.name).replace("%d", max);
		},
		integer: function(control){
			return this.compareByRegex(control, "integer");
		},
		decimal: function(control){
			return this.compareByRegex(control, "decimal");
		},
		email: function(control){
			return this.compareByRegex(control, "email");
		},
		ip: function(control){
			return this.compareByRegex(control, "ip");
		},
		url: function(control){
			return this.compareByRegex(control, "url");
		},
		pattern: function(control){
			var value = Object(control.value).toString();
			var pattern = Object(control.pattern).toString();
			if(eval(pattern).test(value)){
				return "";
			}
			return this.messages.pattern.replace("%s", control.name).replace("%p", pattern);
		},
		compareByRegex(control, field){
			var value = Object(control.value).toString();
			if(this.regexs[field].test(value)){
				return "";
			}
			return this.messages[field].replace("%s", control.name);
		}
    },
    validate: function () {
        this.errors = [];
		this.errorControls = [];
        var controls = this.container.find(".validate");
        if (controls != null) {
            for (var i = 0; i < controls.length; i++) {
				var classes = controls[i].className.split(" ");
				for(var j=0; j<classes.length; j++){
					if(this.rules.indexOf(classes[j]) >= 0){
						var error = this.rulesCallback[classes[j]](controls[i]);
                        if (error.length > 0) {
							if(this.errorControls.indexOf(controls[i].name) == -1){
								this.errors.push(error);
								this.errorControls.push(controls[i].name);
							}
                        }
					}
				}
            }
        }
        return this.errors.length == 0 ? true : false;
    },
	toMsg: function(){
		var res = "";
		for(var i=0; i<this.errors.length; i++){
			res += this.errors[i];
			if(i != this.errors.length-1){
				res += "\n";
			}
		}
		return res;
	}
}