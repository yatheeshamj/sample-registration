import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "spotify-shared/actionTypes/3rdPartyLinks"





function* onOpenBroswerLink(action) {

    //window.open(action.payload)
    window.location.href = action.payload
}

function* onOpenBroswerLinkNewTab(action) {
    if (navigator.vendor.toLowerCase().indexOf('apple') > -1) {
        window.console.log("apple device")
        window.location.href = action.payload;
    } else {
        window.open(action.payload)
        
    }

}

function onOpenWindowWithPost(action){
    const { redirectURL, authenticationToken, userID, name } = action.payload;

    const params = {'AUTHENTICATION_TOKEN': authenticationToken, 'USER_ID': userID}

    var form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", redirectURL);
		form.setAttribute("target", name);

		for (var i in params) {
			if (params.hasOwnProperty(i)) {
				var input = document.createElement('input');
				input.type = 'hidden';
				input.name = i;
				input.value = params[i];
				form.appendChild(input);
         	}
		}

		document.body.appendChild(form);
		window.open("",name);
		form.submit();
		document.body.removeChild(form); 

}


function* onOpenBroswerLinkNewWindow(action) {
    const isMobileSelector = state => state.app.device == "Mobile";
    const isMobileDevice = yield select(isMobileSelector);

    if (navigator.vendor.toLowerCase().indexOf('apple') > -1) {
        window.console.log("apple device")
        window.location.href = action.payload;
    } else {
        if (isMobileDevice) {
            window.open(action.payload)
        } else {
            window.open(action.payload, '', "width=800px,height=600px,status=no,menubar=no,scrollbars=no,titlebar=no,resizable=no,toolbar=no,location=no");
        }
    }


}



export default function* watcher() {
    yield takeEvery(ActionType.OPEN_BROSWER_LINK, onOpenBroswerLink);
    yield takeEvery(ActionType.OPEN_BROSWER_LINK_NEW_TAB, onOpenBroswerLinkNewTab);
    yield takeEvery(ActionType.OPEN_BROSWER_LINK_NEW_WINDOW, onOpenBroswerLinkNewWindow);
    yield takeEvery(ActionType.OPEN_BROWSER_POST_NEW_TAB, onOpenWindowWithPost);
} 
