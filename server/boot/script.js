// module.exports = function(app) {
//   var User = app.models.User;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;
//   var Team = app.models.Team;
//
//   User.create([{
//     username: 'admin',
//     email: 'admin@admin.com',
//     password: 'poko@11'
//   }, ], function(err, users) {
//     if (err) return console.log('%j', err);
//
//     Role.create({
//       name: 'admin'
//     }, function(err, role) {
//       if (err) return console.log(err);
//       console.log(role);
//
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[0].id
//       }, function(err, principal) {
//         if (err) return console.log(err);
//         console.log(principal);
//       });
//
//     });
//
//   });
// }
