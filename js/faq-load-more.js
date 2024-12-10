jQuery(document).ready(function($) {
    $('#load-more-btn').on('click', function() {
        var button = $(this);
        var page = button.data('page');
        var taxonomy = button.data('taxonomy');
        var newPage = page + 1;

        $.ajax({
            url: faq_loadmore_params.ajaxurl,
            type: 'POST',
            data: {
                action: 'faq_humm_load_more',
                page: page,
                taxonomy_term: faq_loadmore_params.taxonomy_term,
                taxonomy_slug: taxonomy,
            },
            success: function(response) {
                if (response === 'no_more_posts') {
                    button.hide(); // Hide the button when there are no more posts
                } else {
                    $('#faq-posts').append(response);
                    button.data('page', newPage); // Increment the page number
                }
            }
        });
    });


    var page = 0;
    var loading = false;
    var loadMoreButton = $('#load-more-btn-infinite-scroll');
    var taxonomyInfiniteScroll = loadMoreButton.data('taxonomy');

    $(window).scroll(function() {
        if (($(window).scrollTop() >= $(document).height() - $(window).height() - 100) && !loading) {
            loading = true;
            $('#load-more-status').show();
            page++;
            $.ajax({
                url: faq_loadmore_params.ajaxurl,
                type: 'POST',
                data: {
                    action: 'faq_humm_load_more',
                    page: page,
                    taxonomy_term: faq_loadmore_params.taxonomy_term,
                    taxonomy_slug: taxonomyInfiniteScroll,
                },
                success: function(response) {
                    if (response != 'no_more_posts') {
                        $('#faq-posts').append(response);
                        loading = false;
                        $('#load-more-status').hide();
                    } else {
                        $('.faq-pagination').hide();
                        $('#load-more-status').hide();
                    }
                }
            });
        }
    });
});
