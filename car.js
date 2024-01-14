export class Car {
    #brand;
    #model;
    #yearOfManufacturing;
    #maxSpeed;
    #maxFuelVolume;
    #fuelConsumption;
    #currentFuelVolume = 0;
    #isStarted = false;
    #mileage = 0;

    start() {
        if (this.#isStarted) {
            throw new Error('Машина уже заведена');
        }

        this.#isStarted = true;
    }

    shutDownEngine() {
        if (!this.#isStarted) {
            throw new Error('Машина ещё не заведена');
        }

        this.#isStarted = false;
    }

    fillUpGasTank(fuelAmount) {
      if (!this.checkIfNumber(fuelAmount) && fuelAmount <= 0) {
        throw new Error('Неверное количество топлива для заправки');
      }

      if (this.#currentFuelVolume + fuelAmount > this.#maxFuelVolume) {
        throw new Error('Топливный бак переполнен');
      }

      this.#currentFuelVolume += fuelAmount;
    }
  
    drive(speed, hours) {
        if(!this.checkIfNumber(speed) && speed <= 0) {
            throw new Error('Неверная скорость');
        }

        if(!this.checkIfNumber(hours) && speed <= 0) {
            throw new Error('Неверное количество часов');
        }

        if(speed > this.#maxSpeed) {
            throw new Error('Машина не может ехать так быстро');
        }

        if(!this.#isStarted) {
            throw new Error('Машина должна быть заведена, чтобы ехать');
        }

        const requiredFuel = (speed / 100) * this.#fuelConsumption * hours;

        if(requiredFuel > this.#currentFuelVolume) {
            throw new Error('Недостаточно топлива');
        }

        this.#currentFuelVolume -= requiredFuel;
        this.#mileage += speed * hours;
    }

    get brand() {
        return this.#brand;
    }

    set brand(value) {
        if (!this.checkForCorrectString(value)) {
            this.#brand = value;
        }
    }

    get model() {
        return this.#model;
    }

    set model(value) {
        if (!this.checkForCorrectString(value)) {
            this.#model = value;
        }  
    }
    
    get yearOfManufacturing() {
        return this.#yearOfManufacturing;
    }

    set yearOfManufacturing(value) {
        const currentYear = new Date().getFullYear();
        const valueChecking = typeof value === 'number' && !isNaN(value) && value >= 1900 && value <= currentYear;

        if (valueChecking) {
            this.#yearOfManufacturing = value;
        }
    }

    get maxSpeed() {
        return this.#maxSpeed;
    }

    set maxSpeed(value) {
        if(this.checkIfNumber(value) && value >= 100 && value <= 300) {
            this.#maxSpeed = value;
        }
    }

    get maxFuelVolume() {
        return this.#maxFuelVolume;
    }

    set maxFuelVolume(value) {
        if(this.checkIfNumber(value) && value >= 5 && value <= 20) {
            this.#maxFuelVolume = value;
        }
    }

    get fuelConsumption() {
        return this.#fuelConsumption;
    }

    set fuelConsumption(value) {
        if(this.checkIfNumber(value) && value > 0) {
            this.#fuelConsumption = value;
        }
    }

    get currentFuelVoluem() {
        return this.#currentFuelVolume;
    }

    get isStarted() {
        return this.#isStarted;
    }

    get mileage() {
        return this.#mileage;
    }

    checkIfNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    checkForCorrectString(value) {
        return typeof value !== 'string' || value.length < 1 || value.length > 50;
    }
}

