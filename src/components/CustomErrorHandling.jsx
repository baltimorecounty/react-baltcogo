export function ErrorCheck(response) {
	var errors = "";

	if(response.data.ErrorsCount > 1){
		for(let i = 0; response.data.ErrorsCount; i++){
			errors += response.data.Errors[i].ErrorText + ", ";
		}
	}
	else{
		errors = response.data.Errors[0].ErrorText;
	}
	return errors;
}