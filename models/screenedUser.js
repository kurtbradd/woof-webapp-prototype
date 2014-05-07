var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var screenedUserSchema = new Schema({
  	email:{type: String, required: true},
  	email_sent: Boolean,
  	pdf_created: Boolean,
  	pdf_path:{ type: String, default: '' },
  	created_at: Date,
  	updated_at: Date,
  	questions: {type: {}, required: true}
});

screenedUserSchema.pre('save', function(next){
  	this.updated_at = new Date;
  	if ( !this.created_at ) {
		this.created_at = new Date;
 	}
  	next();
});

module.exports = mongoose.model('ScreenedUser', screenedUserSchema);