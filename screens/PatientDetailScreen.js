import React from 'react';
import {
	ScrollView,
	View,
	Text,
	Image,
	StyleSheet,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux'; // Use this to select single patient

const PatientDetailScreen = (props) => {
	const patientId = props.navigation.getParam('patientId');
	const selectedPatient = useSelector((state) =>
		// Find a single patient
		state.patients.clients.find((patient) => patient.id === patientId)
	);

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: selectedPatient.photo }} />
			<View>
				<Card>
					<View>
						<Text style={styles.age}>Age: {selectedPatient.age}</Text>
						<Text style={styles.age}>Email: {selectedPatient.email}</Text>
						<Text style={styles.age}>Phone: {selectedPatient.phone}</Text>
						<Text style={styles.age}>Address: {selectedPatient.address}</Text>
					</View>
					<View>
						<Text style={styles.age}>
							Diagnosis: {selectedPatient.diagnosis}
						</Text>
					</View>
				</Card>

				<View style={styles.vitalSignsContainer}>
					<Card>
						<Card.Content>
							<Title>Description</Title>
							<Paragraph>
								<Text style={styles.description}>
									Description: {selectedPatient.description}
								</Text>
							</Paragraph>
						</Card.Content>
					</Card>
				</View>

				<View style={styles.container}>
					<Card>
						<Card.Content>
							<View style={styles.vitalSignsContainer}>
								<Title>Vital Signs</Title>
								<Paragraph>
									<Text style={styles.description}>
										Body Temperature: {selectedPatient.bodyTemperature}
									</Text>
								</Paragraph>
								<Paragraph>
									<Text style={styles.description}>
										Pulse Rate: {selectedPatient.pulseRate}
									</Text>
								</Paragraph>
								<Paragraph>
									<Text style={styles.description}>
										Respiration Rate: {selectedPatient.respirationRate}
									</Text>
								</Paragraph>
								<Paragraph>
									<Text style={styles.description}>
										Blood Pressure: {selectedPatient.systolicBP}/
										{selectedPatient.diastolicBP}
									</Text>
								</Paragraph>
								<Paragraph>
									<Text style={styles.description}>
										Oxygen Saturation: {selectedPatient.o2sat}
									</Text>
								</Paragraph>
							</View>
						</Card.Content>
					</Card>
				</View>
			</View>
		</ScrollView>
	);
};

// Get header title
PatientDetailScreen.navigationOptions = (navData) => {
	return {
		headerTitle: navData.navigation.getParam('patientTitle'),
	};
};

const styles = StyleSheet.create({
	vitalSignsContainer: {
		padding: 10,
		margin: 5,
		backgroundColor: '#ebebeb',
	},
	container: {
		padding: 10,
		margin: 10,
	},
	image: {
		width: '100%',
		height: 200,
	},
	actions: {
		marginVertical: 10,
		alignItems: 'center',
	},
	age: {
		fontSize: 15,
		color: '#888',
		textAlign: 'center',
		marginVertical: 10,
	},
});

export default PatientDetailScreen;
