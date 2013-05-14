var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
	
		//this.el = $("<div/>");
		//this.el.on('click', '.change-pic-btn', this.changePicture);
		$(".add-location-btn").click(this.addLocation);
		$(".change-pic-btn").click(this.changePicture);
		this.showAlert('Store Initialized', 'Info');
        this.store = new MemoryStore();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
	
	changePicture: function(event) {
		event.preventDefault();
		if (!navigator.camera) {
			app.showAlert("Camera API not supported", "Error");
			return;
		}
		var options =   {   quality: 50,
							destinationType: Camera.DestinationType.DATA_URL,
							sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
							encodingType: 0     // 0=JPG 1=PNG
						};
						
	 
		navigator.camera.getPicture(
				function(imageData) {
					$('.employee-image').attr('src', "data:image/jpeg;base64," + imageData);
				},
			
			function() {
				app.showAlert('Error taking picture', 'Error');
			},
			options
		);
		
		
	 
		return false;
	},
	
	addLocation : function(event) {
    event.preventDefault();
    console.log('addLocation');
    navigator.geolocation.getCurrentPosition(
        function(position) {
			console.log(position);
            $('.location').html(position.coords.latitude + ',' + position.coords.longitude);
        },
        function() {
            alert('Error getting location');
        });
    return false;
},
	
	showAlert: function (message, title) {
		if (navigator.notification) {
			alert("ok");
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

};

app.initialize();