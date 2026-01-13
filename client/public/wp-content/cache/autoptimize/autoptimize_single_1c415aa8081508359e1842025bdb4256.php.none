jQuery(document).ready(function($){$(document).on('added_to_wishlist removed_from_wishlist',function(){var counter=$('span.wcount');$.ajax({url:yith_wcwl_l10n.ajax_url,data:{action:'yith_wcwl_update_wishlist_count'},dataType:'json',success:function(data)
{counter.html(data.count);},beforeSend:function()
{},complete:function()
{}})})});