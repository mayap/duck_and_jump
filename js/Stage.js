/**
 * 
 */
Stage.Timer = 2500;

function Stage() {
	
	var _player = new Player($('#player'));
	
	var _obstacle = new Obstacle($('#obstacle'));
	
	var _interval;
	
	var _lastActiveTime = 0;
	
	var _lastTimeChanged = 0;
	
	var _timeStarted = 0;
	
	this.getPlayer = function() {
		return _player;
	}
	
	this.getObstacle = function() {
		return _obstacle;
	}
	
	this.setInterval = function(interval) {
		_interval = interval;
	}
	
	this.getInterval = function() {
		return _interval;
	}
	
	this.setLastActiveTime = function(time) {
		_lastActiveTime = time;
	}
	
	this.getLastActiveTime = function() {
		return _lastActiveTime;
	}
	
	this.setLastTimeChanged = function(time) {
		_lastTimeChanged = time;
	}
	
	this.getLastTimeChanged = function() {
		return _lastTimeChanged;
	}
	
	this.setTimeStarted = function(time) {
		_timeStarted = time;
	}
	
	this.getTimeStarted = function() {
		return _timeStarted;
	}
}

Stage.prototype.start = function() {
	
	var _this = this;
	_this.setTimeStarted(Date.now());
	_this.updateTimer(Date.now());
	
	var interval = window.setInterval(function() {
		var time = Date.now();
		if (time - _this.getLastActiveTime() > Stage.Timer) {
			_this.getObstacle().appear();
			_this.getObstacle().move();
			_this.setLastActiveTime(time);
		}	
		_this.updateTimer(time);
		_this.checkForCollision($('#player'),$('#obstacle'));
		//console.log(_this.checkForCollision($('#player'),$('#obstacle')));
		if (_this.checkForCollision($('#player'),$('#obstacle'))) {
			var health = $("#health-container span").text();
			health--;
			if (health > 0) {
				$("#health-container span").text(health);
			} else if (health == 0) {
				$("#health-container span").text(health);
				$('#name-modal').modal('show');
				this.stop();
			}
			
			$( "#saving" ).on('click', function() {
				$('#name-modal').modal('hide');
				//var row = $('<tr></tr>').appendTo("table");
				//$('<td></td>').text(4).appendTo(row);
			});
			
		}
	}, 200);
}

Stage.prototype.stop = function() {
	if (this.getInterval() !== undefined) {
		window.clearInterval(this.getInterval());
	}
}

Stage.prototype.updateTimer = function(currentTime) {
	if (currentTime - this.getLastTimeChanged() > 800) {
		var timespan = Math.floor((currentTime - this.getTimeStarted()) / 1000);
		
		var minutes = Math.floor(timespan / 60)
		var seconds = timespan % 60;
		
		var html = '';
		html +=  minutes >= 10 ? minutes : '0' + minutes;
		html += ':';
		html +=  seconds >= 10 ? seconds : '0' + seconds;
		
		$('#time-container span').html(html);
		this.setLastTimeChanged(currentTime);
	}
}

Stage.prototype.checkForCollision = function($div1, $div2) {
	var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
      
    if (b1 <= y2 || y1 >= b2 || r1 <= x2 || x1 >= r2) {
    	return false;
    }
    
    return true;
}