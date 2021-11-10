import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const CARS_KEY = 'cars';
_createCars();


export const carService = {
    query,
    remove,
    save,
    getById,
    getNextCarId
};

function query(filterBy = {}) {
    return storageService.query(CARS_KEY)
        .then(cars => {
            if (filterBy.topCars) {
                cars = cars.slice(0, 2);
            }
            return cars;
        });
}

function remove(carId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(CARS_KEY, carId);
}

function save(car) {
    if (car.id) return storageService.put(CARS_KEY, car);
    else return storageService.post(CARS_KEY, car);
}

function getById(carId) {
    return storageService.get(CARS_KEY, carId);
}

function getNextCarId(carId) {
    return query()
        .then(cars => {
            const idx = cars.findIndex(car => car.id === carId);
            return (idx === cars.length - 1) ? cars[0].id : cars[idx + 1].id;
        });
}



