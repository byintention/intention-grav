// practice.js - Main theme JavaScript

// DOMContentLoaded - vanilla JS
document.addEventListener("DOMContentLoaded", function() {

	// Opening answers on faq panel
	var anchors = document.querySelectorAll('.faq-question, .showFaq');
	for (var i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener('click', function() {
			var faqItem = this.closest('.faq');
			if (!faqItem) {
				return;
			}

			var wrapper = faqItem.closest('.faq-wrapper');
			var questionEl = faqItem.querySelector('.faq-question');
			var questionId = questionEl && questionEl.getAttribute('data-questionid');
			if (!questionId) {
				return;
			}

			var answersWrapper = wrapper && wrapper.querySelector('.faq-answers-wrapper');
			var isDesktop = answersWrapper && window.getComputedStyle(answersWrapper).display !== 'none';
			var isOpening = !faqItem.classList.contains('active');
			var escapedId = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(questionId) : questionId;

			if (isOpening && wrapper) {
				var questionFaqs = wrapper.querySelectorAll('.faq-question-wrapper .faq');
				for (var q = 0; q < questionFaqs.length; q++) {
					questionFaqs[q].classList.remove('active');
					var qBtn = questionFaqs[q].querySelector('.showFaq');
					if (qBtn) {
						qBtn.setAttribute('aria-expanded', 'false');
					}
				}
				if (answersWrapper) {
					var answerFaqs = answersWrapper.querySelectorAll('.faq');
					for (var a = 0; a < answerFaqs.length; a++) {
						answerFaqs[a].classList.remove('active');
					}
				}
			}

			if (isOpening) {
				faqItem.classList.add('active');
				if (isDesktop && answersWrapper) {
					var targetAnswer = answersWrapper.querySelector('#' + escapedId);
					if (targetAnswer) {
						var answerFaq = targetAnswer.closest('.faq');
						if (answerFaq) {
							answerFaq.classList.add('active');
						}
					}
				}
			} else {
				faqItem.classList.remove('active');
				if (isDesktop && answersWrapper) {
					var targetAnswerClose = answersWrapper.querySelector('#' + escapedId);
					if (targetAnswerClose) {
						var answerFaqClose = targetAnswerClose.closest('.faq');
						if (answerFaqClose) {
							answerFaqClose.classList.remove('active');
						}
					}
				}
			}

			var btn = faqItem.querySelector('.showFaq');
			if (btn) {
				btn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
			}
		});
	}

	// Add class when page loaded, this fades page in
	document.body.classList.toggle('loaded');

	// Ported from jQuery

	// Mobile nav
	document.querySelectorAll('.menu-trigger').forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			document.body.classList.toggle('mobilenavopen');
			trigger.classList.toggle('navOpen');
		});
	});

	// Start HCP popup
	// Checks to see if that cookie exists, if not then it shows popup
	if (!document.cookie.match(/^(.*;)?\s*hcpCookie\s*=\s*[^;]+(.*)?$/)) {
		document.querySelectorAll('.practicePopup').forEach(function (popup) {
			popup.classList.remove('popHide');
			popup.classList.add('popShow');
		});
		document.body.classList.add('locked');
	}

	// HCP yes button clicked
	document.querySelectorAll('.btnYes').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var d = new Date();
			d.setTime(d.getTime() + (360 * 60 * 1000));
			document.cookie = 'hcpCookie=yes;expires=' + d.toUTCString() + ';path=/';
			document.querySelectorAll('.practicePopup').forEach(function (popup) {
				popup.classList.remove('popShow');
				popup.classList.add('popHide');
			});
			if (!document.querySelector('.popShow')) {
				document.body.classList.remove('locked');
			}
		});
	});
	// end HCP popup

	// Start external link popup
	document.querySelectorAll('.external').forEach(function (link) {
		link.addEventListener('click', function (event) {
			var externalLink = link.getAttribute('href');
			event.preventDefault();
			document.body.classList.add('locked');
			document.querySelectorAll('.practicePopupExternal').forEach(function (popup) {
				popup.classList.remove('popHide');
				popup.classList.add('popShow');
			});
			document.querySelectorAll('.practicePopupExternal .btn').forEach(function (btn) {
				btn.setAttribute('href', externalLink);
			});
		});
	});
	// End external link popup

	// Start popup close button
	document.querySelectorAll('.popClose').forEach(function (closeBtn) {
		closeBtn.addEventListener('click', function (event) {
			event.preventDefault();
			document.querySelectorAll('.practicePopupExternal').forEach(function (popup) {
				popup.classList.remove('popShow');
				popup.classList.add('popHide');
			});
			if (!document.querySelector('.popShow')) {
				document.body.classList.remove('locked');
			}
		});
	});
	// End popup close button

	// Fade in when scroll into view
	document.querySelectorAll('.fade-in').forEach(function (fadeIn) {
		var observer = new IntersectionObserver(function (entries) {
			if (entries.some(function (entry) { return entry.isIntersecting; })) {
				fadeIn.classList.add('in-view');
			}
		});
		observer.observe(fadeIn);
	});

	// Nav dropdowns (migrated from jQuery)

	var chevronHtml = '<div class="arrow_down"><svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.312141 0.311897C0.410819 0.21311 0.528003 0.134741 0.656987 0.0812711C0.785974 0.0278014 0.924232 0.000281278 1.06386 0.000281291C1.20349 0.000281303 1.34175 0.0278015 1.47074 0.0812712C1.59972 0.134741 1.7169 0.21311 1.81558 0.311897L11.6889 10.1865L21.5621 0.311899C21.7615 0.112531 22.0319 0.000526311 22.3139 0.000526335C22.5958 0.00052636 22.8662 0.112531 23.0656 0.311899C23.265 0.511268 23.377 0.78167 23.377 1.06362C23.377 1.34557 23.265 1.61597 23.0656 1.81534L12.4406 12.4403C12.3419 12.5391 12.2247 12.6175 12.0957 12.671C11.9668 12.7244 11.8285 12.752 11.6889 12.752C11.5492 12.752 11.411 12.7244 11.282 12.671C11.153 12.6175 11.0358 12.5391 10.9371 12.4403L0.31214 1.81534C0.213353 1.71666 0.134984 1.59948 0.0815134 1.47049C0.0280447 1.3415 0.00052553 1.20325 0.000525543 1.06362C0.000525555 0.923987 0.0280448 0.785728 0.0815135 0.656742C0.134984 0.527757 0.213353 0.410575 0.312141 0.311897Z" fill="#23185B"/></svg></div>';

	document.querySelectorAll('#nav2 li.menu-parent-item').forEach(function (li) {
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'sub_nav';
		btn.innerHTML = 'Sub nav' + chevronHtml;
		li.insertBefore(btn, li.firstChild);
	});

	var screenWidth = window.innerWidth;

	function siblingSubMenu(el) {
		var parent = el.parentElement;
		if (!parent) {
			return null;
		}
		return parent.querySelector(':scope > .sub-menu');
	}

	if (screenWidth < 1200) {
		document.querySelectorAll('.sub_nav, .menu-parent-item > a').forEach(function (el) {
			el.addEventListener('click', function () {
				var parent = el.parentElement;
				if (parent) {
					parent.classList.toggle('subnavOpen');
				}
			});
		});
	}

	// Dropdown navigation for desktop size
	if (screenWidth > 200) {
		document.querySelectorAll('.sub_nav, #nav2 .menu-parent-item > a').forEach(function (el) {
			el.addEventListener('click', function (event) {
				event.preventDefault();
				var parent = el.parentElement;
				if (!parent) {
					return;
				}
				if (parent.classList.contains('openSubnav')) {
					parent.classList.remove('openSubnav');
				} else {
					document.querySelectorAll('#nav2 li').forEach(function (li) {
						li.classList.remove('openSubnav');
					});
					parent.classList.add('openSubnav');
				}
			});
		});
	}

	// Update the ARIA states on click events
	document.querySelectorAll('.menu-parent-item > a').forEach(function (link) {
		link.addEventListener('click', function () {
			var subMenu = siblingSubMenu(link);
			if (!subMenu) {
				return;
			}
			if (subMenu.getAttribute('aria-expanded') === 'true') {
				subMenu.setAttribute('aria-expanded', 'false');
			} else {
				document.querySelectorAll('.sub-menu').forEach(function (menu) {
					menu.setAttribute('aria-expanded', 'false');
				});
				subMenu.setAttribute('aria-expanded', 'true');
			}
		});
	});

	// Close menus if clicked away
	document.documentElement.addEventListener('click', function () {
		document.querySelectorAll('#nav2 li').forEach(function (li) {
			li.classList.remove('openSubnav');
		});
	});

	var nav2 = document.getElementById('nav2');
	if (nav2) {
		nav2.addEventListener('click', function (event) {
			event.stopPropagation();
		});
	}

});
