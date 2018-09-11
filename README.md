# lv-validate

#### 一、支持以下类型值校验
1. **required：检验表单元素是否有值**
2. **min length：检验表单元素值的长度是否不小于设定值**
3. **max length：检验表单元素值的长度是否不大于设定值**
4. **integer：检验表单元素值是否是一个整数**
5. **decimal：检验表单元素值是否是一个实数**
6. **email：检验表单元素值是否是一个有效邮箱**
7. **ip：检验表单元素值是否是一个有效ip**
8. **url：检验表单元素值是否是一个有效url**
9. **pattern：检验表单元素值是否匹配指定模式**
10. **equalto: 检验表单元素值是否与指定元素的值相同**

#### 二、使用方式
1. 引入jquery
2. 引入lv-validate.js
3. 创建Validate对象
4. 在提交操作前使用Validate.validate方法，并传入包含表单元素的元素的id
5. 如果validate返回false，表示有错误的值，可以通过errors获得错误提示，通过errorControls来获得值错误的表单元素的name