var chai = require('chai');
var chaiHttp = require('chai-http');
var server = 'http://localhost:3000';
var expect = chai.expect;
var model = require('../models/index');
var chaiAsPromised = require('chai-as-promised');
var q = require('q');
chai.use(chaiAsPromised);
chai.use(chaiHttp);


describe('api router test', function () {
    it('404 page', function () {
       return chai.request(server)
            .get("/random")
            .then(function (res) {
                expect(res).to.have.status(404);
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('main page', function () {
        return chai.request(server)
            .get("/")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it('GET/ get all tasks form /api/tasks router', function () {
        return chai.request(server)
            .get('/api/tasks')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('Object');
                expect(res.body.response[0]).have.property('id');
                expect(res.body.response[0]).have.property('user_id');
                expect(res.body.response[0]).have.property('title');
                expect(res.body.response[0]).have.property('description');
                expect(res.body.response[0]).have.property('author_id');
            })
            .catch(function (err) {
                throw err;
            });
    });

    it('GET/:id get single task', function () {
        //create new user for test
        return model.tasks.create({title: 'single api test'})
            .then(function (task) {
                return chai.request(server)
                    .get('/api/tasks/' + task.dataValues.id)
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('Object');
                expect(res.body.response).have.property('title');
                expect(res.body.response.title).equal('single api test');
            });
    });

    it('POST/ add new task into db', function () {
        var body = {
            user_id: 25,
            title: 'api test tittle',
            description: 'api test description',
            author_id: 26
        };
        return chai.request(server)
            .post('/api/tasks')
            .send(body)
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('Object');
                expect(res.body.response).have.property('id');
                expect(res.body.response).have.property('user_id');
                expect(res.body.response).have.property('title');
                expect(res.body.response).have.property('description');
                expect(res.body.response).have.property('author_id');
                expect(res.body.response.user_id).equal(25);
                expect(res.body.response.title).equal('api test tittle');
                expect(res.body.response.description).equal('api test description');
                expect(res.body.response.author_id).equal(26);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('PATCH/ update task', function(){
        return chai.request(server)
            .get('/api/tasks')
            .then(function(tasks){
                return chai.request(server)
                    .patch('/api/tasks/' + tasks.body.response[0].id)
                    .send({title: 'test api patch title'})
            })
            .then(function(res){
                expect(res).to.have.status(200);
            })
            .catch(function (err) {
                throw err;
            })
    });

    it('DELETE/ delete task', function(){
        return chai.request(server)
            .get('/api/tasks')
            .then(function(tasks){
                return chai.request(server)
                    .delete('/api/tasks/' + tasks.body.response[0].id)
            })
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('Object');
            })
            .catch(function (err) {
                throw err;
            })
    });
});