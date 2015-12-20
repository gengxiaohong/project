<%--
  Created by IntelliJ IDEA.
  User: ligson
  Date: 2015/8/11
  Time: 15:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<jsp:include page="../../layout/admin/adminheader.jsp"/>
	<script src="../../js/admin/metadata/left_tree.js" type="text/javascript"></script>
	<script src="../../js/admin/metadata/metadataMgr.js" type="text/javascript"></script>
</head>
<body>
	
	<div class="easyui-layout" fit="true">
           <div region="west" title="元数据分类列表" style="width: 200px;">
               <div style="padding:5px;background:#fafafa;width:100%;border:1px solid #ccc">
                   <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-application_add"
	               onclick="addMetaCategory()">分类</a>
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="addMetaLib()">标准</a>
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-20130408025545236_easyicon_net_30"
	               onclick="delMeta();">删除</a>
	            <a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-edit"
	               onclick="editMeta();">编辑</a>
               </div>
               <ul id="metadata_tree" toolbar="#metatreebar">
               </ul>
           </div>
           <div region="center" title="元数据列表" >
               <div data-options="region:'center',title:'元数据列表'" iconCls="icon-page_world">
			        <div id="tbr" style="padding:5px;height:auto">
			        	<div style="margin-bottom:5px">
			        		<a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="showAddStructureItemDlg()">增加结构类型元数据</a>
				            <a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="showAddDicItemDlg()">增加词汇表类型元数据</a>
				            <a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="showAddItemDlg()">增加普通类型元数据</a>
				            <a class="easyui-linkbutton" plain="true" iconCls="icon-remove" onclick="deleteMetaItem()">删除</a>
			        	</div>
			            <div>
			            	<select class="easyui-combobox" editable="false" id="searchCollection">
				                <option value="0">必须数据</option>
				                <option value="1">通用可选数据</option>
				                <option value="2">分类数据</option>
	                			<option value="3">结构类型</option>
	               				<option value="4">自定义数据</option>
				            </select>
				            <select class="easyui-combobox" editable="false" id="searchCondition">
				                <option value="zh_name">按中文名称</option>
				                <option value="lom_id">按LOM编码</option>
				            </select>
				            <input type="text" class="easyui-textbox" id="searchContent"/>
				            <a class="easyui-linkbutton" plain="true" iconCls="icon-search"  onclick="searchMetaData()">搜索</a>
			            </div>
			        </div>
			        <table toolbar="#tbr" id="metaGrid" class="easyui-treegrid"
			               data-options="singleSelect:true,collapsible:true,method:'post'" rownumbers="true"
               pagination="true">
			        </table>
			    </div>
			    <div id="ttbr">
			        <a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="addItemToDlg()">提交</a>
			        <a class="easyui-linkbutton" plain="true" iconCls="icon-remove">取消</a>
			
			        <p></p>
			    </div>
			    <div toolbar="#ttbr" id="selectItemDlg" title="选择字段" class="easyui-dialog" closed="true"
			         style="width:450px;height:400px;padding:10px;">
   			 </div>
           </div>
       </div>
       
       <div id="addMetaItemDlg" title="增加元数据" class="easyui-dialog" closed="true"
	         style="width:400px;height:auto;padding:10px;"  modal="true">
	        <form>
	            <table class="table">
	                <tr>
	                    <td><label>中文名称:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="zh_name11" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>英文名称</label></td>
	                    <td><input type="text" class="easyui-textbox" id="en_name11" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>LOM编号:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="lom_id11"></td>
	                </tr>
	                <tr>
	                    <td><label>取值数:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="val_num11" required="true" validType="number">
	                    </td>
	                </tr>
	
	
	                <tr>
	                    <td><label>举例:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="example11" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>顺序:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="is_sorted11" required="true">
	                            <option value="true">true</option>
	                            <option value="false">false</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>数据类型:</label></td>
	                    <td>
	                        <select class="easyui-combobox" name="kind" id="kind11" required="true">
	                            <option value="0">多语言字符串</option>
	                            <option value="1">数值</option>
	                            <option value="4">时间</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>类别:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="collection11" required="true">
	                            <option value="0">必选数据</option>
	                            <option value="1">通用可选数据</option>
	                            <option value="2">分类数据</option>
	                            <option value="3">结构类型</option>
	                            <option value="4">自定义类型</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>解释:</label></td>
	                    <td><input type="text" multiple="true" style="height:50px;" class="easyui-textbox"
	                               id="description11" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>值域:</label></td>
	                    <td><input type="text" class="easyui-textbox" style="height:50px;" multiple="true" id="domain11"
	                               required="true"></td>
	                </tr>
	            </table>
	        </form>
	    </div>
	    <div id="addStructureItemDlg" class="easyui-dialog" title="选择结构类型" closed="true"
	         style="width:400px;height:auto;padding:10px;"  modal="true">
	        <form>
	            <table class="table">
	                <tr>
	                    <td><label>中文名称:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="zh_name14" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>英文名称</label></td>
	                    <td><input type="text" class="easyui-textbox" id="en_name14" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>LOM编号:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="lom_id14"></td>
	                </tr>
	                <tr>
	                    <td><label>取值数:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="val_num14" required="true" validType="number">
	                    </td>
	                </tr>
	
	
	                <tr>
	                    <td><label>举例:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="example14" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>顺序:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="is_sorted14" required="true">
	                            <option value="true">true</option>
	                            <option value="false">false</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>结构类型:</label></td>
	                    <td>
	                        <select style="width:150px;" class="easyui-combobox" name="kind" id="structure_type_id14"
	                                required="true" editable="false">
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>类别:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="collection14" required="true">
	                            <option value="0">必选数据</option>
	                            <option value="1">通用可选数据</option>
	                            <option value="2">分类数据</option>
	                            <option value="3">结构类型</option>
	                            <option value="4">自定义类型</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>解释:</label></td>
	                    <td><input type="text" multiple="true" style="height:50px;" class="easyui-textbox"
	                               id="description14" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>值域:</label></td>
	                    <td><input type="text" class="easyui-textbox" style="height:50px;" multiple="true" id="domain14"
	                               required="true"></td>
	                </tr>
	            </table>
	        </form>
	    </div>
	    <div id="addDicItemDlg" class="easyui-dialog" title="添加词汇表类型" closed="true"
	         style="width:400px;height:auto;padding:10px;"  modal="true">
	        <form>
	            <table class="table">
	                <tr>
	                    <td><label>中文名称:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="zh_name12" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>英文名称</label></td>
	                    <td><input type="text" class="easyui-textbox" id="en_name12" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>LOM编号:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="lom_id12"></td>
	                </tr>
	                <tr>
	                    <td><label>取值数:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="val_num12" required="true" validType="number">
	                    </td>
	                </tr>
	
	
	                <tr>
	                    <td><label>举例:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="example12" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>顺序:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="is_sorted12" required="true">
	                            <option value="true">true</option>
	                            <option value="false">false</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>词汇表类型:</label></td>
	                    <td>
	                        <select style="width:150px;" class="easyui-combobox" name="kind" id="vocabulary_type_id12"
	                                required="true">
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>类别:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="collection12" required="true">
	                            <option value="0">必选数据</option>
	                            <option value="1">通用可选数据</option>
	                            <option value="2">分类数据</option>
	                            <option value="3">结构类型</option>
	                            <option value="4">自定义类型</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>解释:</label></td>
	                    <td><input type="text" multiple="true" style="height:50px;" class="easyui-textbox"
	                               id="description12" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>值域:</label></td>
	                    <td><input type="text" class="easyui-textbox" style="height:50px;" multiple="true" id="domain12"
	                               required="true"></td>
	                </tr>
	            </table>
	        </form>
	    </div>
	    <div id="editMetaItemDlg" title="编辑字段" class="easyui-dialog" closed="true"
	         style="width:400px;height:auto;padding:10px;"  modal="true">
	        <form>
	            <input type="hidden" name="metaTypeId" value=""/>
	            <table class="table">
	                <tr>
	                    <td><label>中文名称:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="zh_name21" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>英文名称</label></td>
	                    <td><input type="text" class="easyui-textbox" id="en_name21" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>LOM编号:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="lom_id21"></td>
	                </tr>
	                <tr>
	                    <td><label>取值数:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="val_num21" required="true" validType="number">
	                    </td>
	                </tr>
	
	
	                <tr>
	                    <td><label>举例:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="example21" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>顺序:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="is_sorted21" required="true">
	                            <option value="true">true</option>
	                            <option value="false">false</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>数据类型:</label></td>
	                    <td>
	                        <select class="easyui-combobox" name="kind" id="kind21" required="true">
	                            <option value="0">多语言字符串</option>
	                            <option value="1">数值</option>
	                            <option value="4">时间</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>类别:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="collection21" required="true">
	                            <option value="0">必选数据</option>
	                            <option value="1">通用可选数据</option>
	                            <option value="2">分类数据</option>
	                            <option value="3">结构类型</option>
	                            <option value="4">自定义类型</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>解释:</label></td>
	                    <td><input type="text" multiple="true" style="height:50px;" class="easyui-textbox"
	                               id="description21" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>值域:</label></td>
	                    <td><input type="text" class="easyui-textbox" style="height:50px;" multiple="true" id="domain21"
	                               required="true"></td>
	                </tr>
	            </table>
	        </form>
	    </div>
	    <div id="editDicItemDlg" class="easyui-dialog" title="编辑词汇表类型" closed="true"
	         style="width:400px;height:auto;padding:10px;"  modal="true">
	        <form>
	            <input type="hidden" name="metaTypeId" value="">
	            <table class="table">
	                <tr>
	                    <td><label>中文名称:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="zh_name22" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>英文名称</label></td>
	                    <td><input type="text" class="easyui-textbox" id="en_name22" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>LOM编号:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="lom_id22"></td>
	                </tr>
	                <tr>
	                    <td><label>取值数:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="val_num22" required="true" validType="number">
	                    </td>
	                </tr>
	
	
	                <tr>
	                    <td><label>举例:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="example22" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>顺序:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="is_sorted22" required="true">
	                            <option value="true">true</option>
	                            <option value="false">false</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>词汇表类型:</label></td>
	                    <td>
	                        <select style="width:150px;" class="easyui-combobox" name="kind" id="vocabulary_type_id22"
	                                required="true">
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>类别:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="collection22" required="true">
	                            <option value="0">必选数据</option>
	                            <option value="1">通用可选数据</option>
	                            <option value="2">分类数据</option>
	                            <option value="3">结构类型</option>
	                            <option value="4">自定义类型</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>解释:</label></td>
	                    <td><input type="text" multiple="true" style="height:50px;" class="easyui-textbox"
	                               id="description22" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>值域:</label></td>
	                    <td><input type="text" class="easyui-textbox" style="height:50px;" multiple="true" id="domain22"
	                               required="true"></td>
	                </tr>
	            </table>
	        </form>
	    </div>
	
	    <div id="editStructureItemDlg" class="easyui-dialog" title="编辑结构类型" closed="true"
	         style="width:400px;height:auto;padding:10px;"  modal="true">
	        <form>
	            <input type="hidden" name="metaTypeId" value="">
	            <table class="table">
	                <tr>
	                    <td><label>中文名称:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="zh_name24" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>英文名称</label></td>
	                    <td><input type="text" class="easyui-textbox" id="en_name24" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>LOM编号:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="lom_id24"></td>
	                </tr>
	                <tr>
	                    <td><label>取值数:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="val_num24" required="true" validType="number">
	                    </td>
	                </tr>
	
	
	                <tr>
	                    <td><label>举例:</label></td>
	                    <td><input type="text" class="easyui-textbox" id="example24" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>顺序:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="is_sorted24" required="true">
	                            <option value="true">true</option>
	                            <option value="false">false</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>结构类型:</label></td>
	                    <td>
	                        <select style="width:150px;" class="easyui-combobox" name="kind" id="structure_type_id24"
	                                required="true" editable="false">
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>类别:</label></td>
	                    <td>
	                        <select class="easyui-combobox" id="collection24" required="true">
	                            <option value="0">必选数据</option>
	                            <option value="1">通用可选数据</option>
	                            <option value="2">分类数据</option>
	                            <option value="3">结构类型</option>
	                            <option value="4">自定义类型</option>
	                        </select>
	                    </td>
	                </tr>
	                <tr>
	                    <td><label>解释:</label></td>
	                    <td><input type="text" multiple="true" style="height:50px;" class="easyui-textbox"
	                               id="description24" required="true"></td>
	                </tr>
	                <tr>
	                    <td><label>值域:</label></td>
	                    <td><input type="text" class="easyui-textbox" style="height:50px;" multiple="true" id="domain24"
	                               required="true"></td>
	                </tr>
	            </table>
	        </form>
	    </div>
       
       
       <div id="addMetaLibDlg" class="easyui-dialog" title="添加元数据标准" style="width:300px;height:auto;padding:10px;" closed="true">
		    <form id="add_metaLib_form" method="post">
		        <input type="hidden" name="category_id" value="" id="categoryId10">
		        <table class="table">
		            <tr>
		                <td><label>标准名称:</label></td>
		                <td><input type="text" required="true" class="easyui-textbox" id="name10"/></td>
		            </tr>
		            <tr>
		                <td><label>标准描述:</label></td>
		                <td><input type="text" class="easyui-textbox" multiline="true" style="height:60px"
		                           id="desc10"/>
		                </td>
		            </tr>
		            <tr>
		                <td><label>版本:</label></td>
		                <td><input type="text" required="true" class="easyui-textbox"
		                           id="version10" validType="number"/>
		                </td>
		            </tr>
		            <tr>
		                <td colspan="2" style="text-align:center;">
		                    <a class="easyui-linkbutton" onclick="submitAddMetaLib()">提交</a>
		                    <a class="easyui-linkbutton" onclick="$('#addMetaLibDlg').dialog('close')">取消</a>
		                </td>
		            </tr>
		        </table>
		    </form>
		</div>
		
		<div id="editMetaLibDlg" class="easyui-dialog" title="编辑元数据标准" style="width:300px;height:auto;padding:10px;" closed="true">
		    <form>
		        <input type="hidden" name="category_id" value="" id="categoryId11">
		        <input type="hidden" name="id11" id="id11">
		        <table class="table">
		            <tr>
		                <td><label>标准名称:</label></td>
		                <td><input type="text" required="true" class="easyui-textbox" id="name11"/></td>
		            </tr>
		            <tr>
		                <td><label>标准描述:</label></td>
		                <td><input type="text" class="easyui-textbox" multiline="true" style="height:60px"
		                           id="desc11"/>
		                </td>
		            </tr>
		            <tr>
		                <td><label>版本:</label></td>
		                <td><input type="text" required="true" class="easyui-textbox"
		                           id="version11" validType="number"/>
		                </td>
		            </tr>
		            <tr>
		                <td colspan="2" style="text-align:center;">
		                    <a class="easyui-linkbutton" onclick="submitModifyMetaLib()">提交</a>
		                    <a class="easyui-linkbutton" onclick="$('#editMetaLibDlg').dialog('close')">取消</a>
		                </td>
		            </tr>
		        </table>
		    </form>
		</div>
		
		<div id="addMetaCategoryDlg" class="easyui-dialog" title="添加元数据标准分类" style="width:350px;height:auto;padding:10px;" closed="true">
		    <form id="add_metaCategory_form" method="post">
		        <input type="hidden" name="parent_id" value="">
		        <table class="table">
		            <tr>
		                <td><label>元数据分类名称:</label></td>
		                <td><input type="text" required="true" id="categoryName1" class="easyui-textbox"/></td>
		            </tr>
		            <tr>
		                <td><label>元数据分类描述:</label></td>
		                <td><input type="text" required="true" id="categoryDesc1" class="easyui-textbox" multiline="true"
		                           style="height:60px"/>
		                </td>
		            </tr>
		
		            <tr>
		                <td colspan="2" style="text-align:center;">
		                    <a class="easyui-linkbutton" onclick="submitAddMetaCategory()">提交</a>
		                    <a class="easyui-linkbutton" onclick="$('#addMetaCategoryDlg').dialog('close')">取消</a>
		                </td>
		            </tr>
		        </table>
		    </form>
		</div>
		
		<div id="editMetaCategoryDlg" class="easyui-dialog" title="编辑元数据标准分类" style="width:350px;height:auto;padding:10px;" closed="true">
		    <form>
		        <input type="hidden" id="parent_id2" value="">
		        <input type="hidden" id="id2" value="">
		        <table class="table">
		            <tr>
		                <td><label>元数据分类名称:</label></td>
		                <td><input type="text" required="true" id="categoryName2" class="easyui-textbox"/></td>
		            </tr>
		            <tr>
		                <td><label>元数据分类描述:</label></td>
		                <td><input type="text" required="true" id="categoryDesc2" class="easyui-textbox" multiline="true"
		                           style="height:60px"/>
		                </td>
		            </tr>
		
		            <tr>
		                <td colspan="2" style="text-align:center;">
		                    <a class="easyui-linkbutton" onclick="submitModifyMetaCategory()">提交</a>
		                    <a class="easyui-linkbutton" onclick="$('#editMetaCategoryDlg').dialog('close')">取消</a>
		                </td>
		            </tr>
		        </table>
		    </form>
		</div>
</body>
