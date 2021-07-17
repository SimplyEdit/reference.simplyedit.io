(function() {
    function hideHelper() {
        var helper = document.getElementById('SimplyEditLogin');
        if (helper) {
            helper.style.visibility = 'hidden';
            helper.classList.remove('simply-visible');
        }
    }
    function showHelper() {
        var helper = document.getElementById('SimplyEditLogin');
        if (helper) { 
            helper.style.visibility = 'visible';
            helper.classList.add('simply-visible');
        }
    }
    if (!localStorage.getItem('simplyEditLoginHelper')) {
        var checkHelper = function() {
            if ( location.hash == '#simply-edit' ) {
               localStorage.setItem('simplyEditLoginHelper',true);
               hideHelper();
            } 
        };
        window.addEventListener('hashchange', checkHelper);
        checkHelper();
    } else {
        if ( location.hash == '#simply-edit' ) {
            return;
        }
        var helper = localStorage.getItem('simplyEditLoginHelper');
        if ( typeof helper != 'object' ) {
            helper = {
                x: -50,
                y: -50
            };
        }
        var helperButton = document.getElementById('SimplyEditLogin');
        if (!helperButton) {
            var helperButton = document.createElement('div');
            helperButton.id = 'SimplyEditLogin';
            helperButton.setAttribute(
                'style', 
                'background-color: white; border-radius: 50%; width: 50px; height: 50px; box-sizing: border-box;'+
                'box-shadow: 1px 1px 5px #888; position: fixed; z-index: 999999; opacity: 0.5;'+
                'cursor: pointer; padding: 6px;'
            ); 
            helperButton.title = 'Start SimplyEdit';   
            helperImage = document.createElement('img');
            helperImage.src = "https://cdn.simplyedit.io/1/muze/graphics/simply-edit-centered.svg";
            helperImage.setAttribute(
                'style',
                '-webkit-touch-callout: none; touch-callout: none; touch-action: none;'+
                'margin-top: 10px; position: absolute; margin-left: -4px; width: 46px;'
            );
            helperButton.appendChild(helperImage);
            if ( helper.x<0 ) {
                helperButton.style.right = -helper.x+'px';
            } else {
                helperButton.style.left = helper.x+'px';
            }
            if ( helper.y<0 ) {
                helperButton.style.bottom = -helper.y+'px';
            } else { 
                helperButton.style.top = helper.y+'px';
            }
        } else {
            showHelper();
        }
        var timer = null;
        helperButton.onmousedown = 
        helperButton.ontouchstart = function() {
            timer = window.setTimeout(function() {
                // remove helperButton
                localStorage.removeItem('simplyEditLoginHelper');
                document.body.removeChild(helperButton);   
            }, 1000);
        };
        helperButton.onmouseup =
        helperButton.ontouchend = function() {
            if ( timer ) {
                window.clearTimeout(timer);
            }
        };
        helperButton.onclick = function() {
            document.location.hash = '#simply-edit';
            helperButton.style.display = 'none';
            return false;
        };
        helperButton.onmouseover =
        helperButton.onfocus = function() {
            helperButton.style.opacity = 1;
        };
        helperButton.onmouseout =
        helperButton.onblur = function() { 
            helperButton.style.opacity = 0.5;
        };
        helperImage.addEventListener('contextmenu', function(evt) {
            evt.preventDefault();
        });
        document.body.appendChild(helperButton);
    }
})();