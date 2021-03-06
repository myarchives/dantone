<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);




?>

<script>
	function basket(action, productID) {			
		if(productID) {
			var url = "<?=SITE_DIR?>include/basket.php";
			var data = {
				pID: productID,
				action: action
			}
			$.post(url, data, function(response) {
				$('#cartInHeaderWrapper').html(response)
				location.href = "#cart";

			})
			BX.onCustomEvent('OnBasketChange');	
		}			
	}
</script>


<h1 class="h2 text-left h2-profile mb10"><?=$arResult["NAME"]?></h1>

<div class="clearfix mb20">
	<?$APPLICATION->IncludeComponent("bitrix:breadcrumb","section_breadcrumb",Array(
		"START_FROM" => "0", 
		"PATH" => "", 
		"SITE_ID" => "s1" 
		)
		);?> 

		<div class="fright sort-container">
			<?if(isset($_REQUEST["sortField"])) {
				$sort = $_REQUEST["sortField"];
			}?>
			<select id="sort" style="position: absolute; left: -9999px;">
				<option value=""><?=GetMessage('CATALOG_SORT')?></option>
				<option value="hit" <?= ($sort == "hit") ? 'selected="selected"' : ''?>><?=GetMessage('CATALOG_SORT_POPULAR')?></option>
				<option value="price" <?= ($sort == "price") ? 'selected="selected"' : ''?>><?=GetMessage('CATALOG_SORT_PRICE')?></option>
				<option value="discount" <?= ($sort == "discount") ? 'selected="selected"' : ''?>><?=GetMessage('CATALOG_SORT_DISCOUNT')?></option>
			</select>			    
		</div>

		<script>
			$(function() {
				$('#sort').on('change', function() {
					var val = $(this).val();

					location.href = "?sortField=" + val

				});
			});
		</script>

	</div>




	<div class="catalog-main-container" role="main" id="main">

		<div class="bnr-slider a-bnr-slider">

			<ul class="slides">
				<?foreach($arResult["UF_SLIDERPICS"] as $pic):?>
				<li class="" style="width: 797px; float: left; display: block;">
					<a style="cursor:default;">
						<?$src = CFile::GetPath($pic);?>
						<img src="<?=$src?>" alt="" draggable="false">

						<div class="bnr-text white"></div>
					</a>
				</li>
				<?endforeach;?> 
			</ul>

		</div>


		<?if (!empty($arResult['ITEMS'])):?> 
		<ul class="product-list-static" id="productCatalogBlock">
			<?foreach($arResult["ITEMS"] as $arItem):?> 

			<li>

				<div class="photo">
					<a data-fancybox-href="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" rel="g<?=$arItem['ID']?>" class="fancybox-media" href="<?=$arItem["DETAIL_PAGE_URL"]?>" title="Посмотреть детали" id="productLink-1<?=$arItem["ID"]?>">
						<img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="">
					</a>
					<?if($arItem['PROPERTIES']['MORE_PHOTO']['VALUE']):?>
					<?foreach($arItem['PROPERTIES']['MORE_PHOTO']['VALUE'] as $k=>$pid): if($k==0)continue;?>
					<a data-fancybox-href="<?=CFile::GetPath($pid)?>" rel="g<?=$arItem['ID']?>" class="fancybox-media"></a>
					<?endforeach?>
					<?endif?>
					<div class="product-label-container">
						<?if($arItem["PROPERTIES"]["NEWPRODUCT"]["VALUE"] == "Y"):?>	
						<div class="product-label-green">new</div>
						<?endif;?>	
					</div>
					<div class="product-label-container">
						<?if($arItem["PROPERTIES"]["DISCOUNT"]["VALUE"] == "Y"):?>	
						<div class="product-label-red">sale</div>
						<?endif;?>	
					</div>
					<div class="product-label-container">
						<?if($arItem["PROPERTIES"]["WOW"]["VALUE"] == "Y"):?>	
						<div class="product-label-yellow">wow</div>
						<?endif;?>	
					</div>
					<div class="product-label-container">
						<?if($arItem["PROPERTIES"]["INSTOCK"]["VALUE"] == "Y"):?>	
						<div class="product-label-blue">in stock</div>
						<?endif;?>	
					</div>
				</div>
				<div class="descr">
					<div class="title">
						<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" id="productLink-2<?=$arItem["ID"]?>" title="<?=GetMessage('CATALOG_SECTION_SEE')?>"><?=$arItem["NAME"]?></a>
					</div>


					<?$minPrice = false;
					if (isset($arItem['MIN_PRICE']) || isset($arItem['RATIO_PRICE']))
						$minPrice = (isset($arItem['RATIO_PRICE']) ? $arItem['RATIO_PRICE'] : $arItem['MIN_PRICE']);?>
					<div class="price">

						<?if (!empty($minPrice))
						{
							if ('N' == $arParams['PRODUCT_DISPLAY_MODE'] && isset($arItem['OFFERS']) && !empty($arItem['OFFERS'])) {
								echo GetMessage(
									'CT_BCS_TPL_MESS_PRICE_SIMPLE_MODE',
									array(
										'#PRICE#' => $minPrice['PRINT_DISCOUNT_VALUE'],
										'#MEASURE#' => GetMessage(
											'CT_BCS_TPL_MESS_MEASURE_SIMPLE_MODE',
											array(
												'#VALUE#' => $minPrice['CATALOG_MEASURE_RATIO'],
												'#UNIT#' => $minPrice['CATALOG_MEASURE_NAME']
												)
											)
										)
									);
							}
							else
							{
								?><span class='value'><?if($arItem["PROPERTIES"]["PRICE_FROM"]["VALUE"] == "Y"):?>
								<?=GetMessage('CATALOG_SECTION_FROM')?>   
								<?endif;?><?=$minPrice['PRINT_DISCOUNT_VALUE']?></span><?
							}
							if ('Y' == $arParams['SHOW_OLD_PRICE'] && $minPrice['DISCOUNT_VALUE'] < $minPrice['VALUE'])
							{
								?>
								<span class="price-old"> 
									<span class='value'><?=$minPrice['PRINT_VALUE']?></span>
								</span> 
								<?
							}
						}
						unset($minPrice);
						?>

					</div>
				</div>
				<a href="#" onclick="basket('add',<?=$arItem["OFFERS"][0]["ID"]?>); return false;" class="btn btn-blue btn-medium" id=""><?=GetMessage('CATALOG_TOCART')?></a>
			</li>
			<?endforeach;?>
		</ul>

		<?endif;?>


		<article class="about text-left">

			<?if($arResult["DESCRIPTION"]):?>
			<?=$arResult["DESCRIPTION"]?>
			<?endif;?>

			<h3></h3>

			<p></p>
			<?=GetMessage('CATALOG_SECTION_DESCRIPTION')?><p></p>
		</article>
	</div>