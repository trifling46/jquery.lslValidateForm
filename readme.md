### 注意
1. 如果横向展示tip，input 的父元素定位必须为 position:relative
2. 每个input 必须在独立的父元素包围下，且input必须要与左侧label同一等级，否则会出现tip定位错误
3. data-vtype 必填，所有需要验证的input都是根据它来查找的
4. 当垂直提示方式时，input父元素的高度必须是auto（不能设置固定值）

### 用法
1. form 的 data-validate-type必填  input的dat-vtype必填
2. 在需要jquery.lslValidateForm验证的表单中设置data-validate-type = 'ls-h-validateForm' 或ls-v-validateForm 并关闭默认验证novalidate
3. data-vtype：表示需要验证类型，可取值required、fixedPhone、phone、email、identityID、regexp
4. data-vmsg：表示tip 提示信息

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

作者：larryzhao
链接：http://www.jianshu.com/p/sTeAbC
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。