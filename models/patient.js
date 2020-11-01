class Patient { // The received arguments in the constructor that makes up a patient and store in properties of object
    constructor(id, careProviderId, title, photo, diagnosis, age, description,bodyTemperature, pulseRate, respirationRate, systolicBP, diastolicBP, o2sat,  isCritical, ) {
        this.id = id;
        this.careProviderId = careProviderId;
        this.title = title;
        this.photo = photo;
        this.diagnosis = diagnosis;
        this.age = age;
        this.description = description;
        this.bodyTemperature = bodyTemperature;
        this.pulseRate = pulseRate;
        this.respirationRate = respirationRate;
        this.systolicBP = systolicBP;
        this.diastolicBP = diastolicBP;
        this.o2sat = o2sat;
        this.isCritical = isCritical;
    }
}

export default Patient;