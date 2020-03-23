export default {
    data(){
        return {
            /* 表单字段交互操作映射(对应二次封装的表单组件名称name)
               input组件---insureEnterInput
               selector组件---insureEnterSelector
               datepicker组件---insureEnterDatePicker
               tabpicker组件---insureEnterTabPicker
               switch组件---insureEnterSwitch  */
            mixinFormHandleType:{
                relationToAppnt:'insureEnterSelector', //被保人与投保人的关系（只被保人有此字段）
                relationToInsured:'insureEnterSelector', //受益人与被保人的关系（只有受益人由此字段）
                name:'insureEnterInput', //姓名
                idType:'insureEnterSelector', //证件类型
                idNo:'insureEnterInput', //证件号
                sex:'insureEnterSelector', //性别
                birthday:'insureEnterDatePicker', //出生日期
                mobile:'insureEnterInput', //手机号
                height:'insureEnterInput', //身高
                weight:'insureEnterInput', //体重
                city:'insureEnterTabPicker', //省市
                address:'insureEnterInput', //地址
                zipCode:'insureEnterInput', //邮政编码
                profession:'insureEnterTabPicker', //职业
                taxPayerType:'insureEnterSelector', //纳税标识
                email:'insureEnterInput', //邮箱
                isLongTime:'insureEnterSwitch', //证件长期有效
                certificateValiditiedPeriod:'insureEnterDatePicker', //证件有效止期
                residence:'insureEnterTabPicker', //户籍
                income:'insureEnterInput', //年收入
                incomSource:'insureEnterSelector', //收入来源
                socialSecurity:'insureEnterSelector', //是否有社保
                marital:'insureEnterSelector', //婚姻状况
                education:'insureEnterSelector', //教育程度
                bnfLot:'insureEnterInput', // 受益份额
                bnfGrade:'insureEnterSelector', // 受益顺序
                workUnit:'insureEnterInput',
                houseType:'insureEnterSelector',
                lifeGetMode:'insureEnterSelector',
                rebuyFlag:'insureEnterSelector'
            },
            /* 
                对应表单元素md-imput-item/md-field-item的配置信息(对应文档的配置字段可随意配置，但请勿重复声明页面已使用配置信息) 
                insureEnterInput、insureEnterDatePicker、insureEnterSwitch内部封装md-imput-item;
                insureEnterSelector、insureEnterTabPicker内部封装md-field-item。
            */
            mixinFormInputConfig:{
                //被保人与投保人的关系（只被保人有次字段）
                relationToAppnt:{},
                // 受益人与被保人的关系(只有受益人有)
                relationToInsured:{},
                //姓名
                name:{
                    type:'text',
                    readonly:false,
                    clearable:true,
                },
                //证件类型
                idType:{},
                //证件号
                idNo:{
                    type:'text',
                    readonly:false,
                    clearable:true,
                    maxlength:'18',
                },
                //性别
                sex:{},
                //出生日期
                birthday:{
                    type:'text',
                    readonly:true,
                },
                //手机号
                mobile:{
                    type:'phone',
                    readonly:false,
                    clearable:true,
                },
                //身高
                height:{
                    type:'text',
                    readonly:false,
                    clearable:true,
                },
                //体重
                weight:{
                    type:'digit',
                    readonly:false,
                    clearable:true,
                    maxlength:'3',
                },
                //省市
                city:{},
                //地址
                address:{
                    type:'text',
                    readonly:false,
                    clearable:true,
                },
                //邮政编码
                zipCode:{
                    type:'digit',
                    readonly:false,
                    clearable:true,
                    maxlength:'6',
                },
                //职业
                profession:{},
                //纳税标识
                taxPayerType:{},
                //邮箱
                email:{
                    type:'text',
                    readonly:false,
                    clearable:true,
                },
                //证件长期有效
                isLongTime:{
                    type:'text',
                    readonly:true,
                },
                //证件有效止期
                certificateValiditiedPeriod:{
                    type:'text',
                    readonly:true,
                },
                //户籍
                residence:{},
                //年收入
                income:{
                    type:'digit',
                    readonly:false,
                    clearable:true,
                },
                //收入来源
                incomSource:{},
                //是否有社保
                socialSecurity:{},
                //婚姻状况
                marital:{},
                //教育程度
                education:{},
                // 受益份额
                bnfLot:{
                    type:'digit',
                    readonly:false,
                    clearable:true,
                    maxlength:'3',
                },
                // 受益顺序
                bnfGrade:{},
                workUnit:{
                    type:'text',
                    readonly:false,
                    clearable:true,
                },
                houseType:{},
                lifeGetMode:{},
                rebuyFlag:{}
            },
            // 性别选项信息
            mixinOptionsSex:[
                {
                    value: '0',
                    text: '男',
                },
                {
                    value:'1',
                    text:'女'
                }
            ],
            // 有无社保选项信息
            mixinOptionsSocialSecurity:[
                {
                    value: '1',
                    text: '有社保',
                },
                {
                    value: '0',
                    text: '无社保',
                }
            ],
        }
    },
    methods:{
        mixinAlterPlaceholderText(identity,type,plusText){
            let obj1 = {
                appnt:'投保人',
                insured:'被保人',
                bnf:'受益人',
                other:''
            }
            let str = `${obj1[identity]}${plusText}`
            let obj2 = {
                insureEnterInput:`请输入${str}`,
                insureEnterSelector:`请选择${str}`,
                insureEnterSelectorImmediate:`请选择${str}`,
                insureEnterDatePicker:`请选择${str}`,
                insureEnterTabPicker:`请选择${str}`,
                insureEnterSwitch:''
            }
            return obj2[type]
        }
    }
}