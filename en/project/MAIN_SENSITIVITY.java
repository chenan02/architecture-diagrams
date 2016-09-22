/*== MAIN_SENSITIVITY.java ==========================================================================
Description   : 
Version       : MAIN_SENSITIVITY.java implemented 2016-4-21 12:07:20 by Dean Wang
Application   : Comfort and Climate
------------------------------------------------------------------------------------------------
Calculations  : H. Burmeister and Prof. B. Keller
Written   	  : December, 2005 by Junghans, Lars
===============================================================================================*/

package ch.enterag.candc.balance;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import javax.xml.bind.JAXBException;

import ch.enterag.candc.database.Project;
import ch.enterag.candc.generated.Climate;
import ch.enterag.candc.meteo.MAIN_SHGC;
import ch.enterag.utils.jaxb.Io;
/*== MAIN_SENSITIVITY.java ===================================================================
Description   : Computer program modul to calculate the inside temperature of a single zone 
				model, RUN ONCE WHEN PROJECT IS FIRST CREATED
Version       : MAIN_SENSITIVITY.java modified 2016-09-05
Application   : Comfort and Climate
------------------------------------------------------------------------------------------------
Calculations  : H. Burmeister and Prof. B. Keller
Written   	  : December, 2005 by Junghans, Lars
===============================================================================================*/
import ch.enterag.utils.logging.IndentLogger;

public class MAIN_SENSITIVITY {
	public static final String sCLIMATE_SCHEMA = "../res/Climate-2.xsd";
	public static final int iMONTHS_PER_YEAR = 12;
	public static final int iDAYS_PER_YEAR = 365;
	public static final int iHOURS_PER_YEAR = 24*iDAYS_PER_YEAR;
	//changed
	public int no_of_sens = 13;
	protected static Project ms_project = null;
	private static Climate ms_climate = null;
	private static File ms_fClimate = null;
	private static IndentLogger ms_il = IndentLogger.getIndentLogger(MAIN_SENSITIVITY.class.getName());
	private int[] OPT_REC_out = new int[15];
	private int[] option_rank_out = new int[30];
	private int[] REC_SENS_RESULT = new int[11];
	private double[] OPT_REC_RESULT = new double[11];
//	public int[] getOPT_REC_out() {
//		return OPT_REC_out;
//	}
//
//	public int[] getOption_rank_out() {
//		return option_rank_out;
//	}

	public int[] getREC_SENS_RESULT() {
		return REC_SENS_RESULT;
	}

	public double[] getOPT_REC_RESULT() {
		return OPT_REC_RESULT;
	}
	
	/*------------------------------------------------------------------*/
	/** constructor initializes validation of climate XML and loads a
	 * climate file. 
	 * @param fileClimate climate file.
	 * @param project current project state. 
	 * @throws FileNotFoundException if climate XML file could not be read.
	 * @throws IOException, if a file I/O error occurred.
	 * @throws JAXBException if an error occurred during unmarshalling. 
	 */
	public MAIN_SENSITIVITY (File fileClimate, Project project)
	throws FileNotFoundException, IOException, JAXBException
	{
		ms_il.enter(fileClimate,project);
		ms_project = project;
		ms_fClimate = fileClimate;
		ms_climate = Io.readJaxbObject(Climate.class, 
				fileClimate, 
				MAIN_SENSITIVITY.class.getResource(sCLIMATE_SCHEMA));
		if (ms_climate.getAverage().size() != iHOURS_PER_YEAR)
			throw new IOException("Climate file did not contain "+String.valueOf(iHOURS_PER_YEAR)+" hourly averages!");
		ms_il.exit();
	} /* constructor MAIN_SENSITIVITY */
	
	// start of calculation
	public void sensitivityStudy(){
		String PROJECT_NAME = ms_project.getName();     												// Name of project
		String CLIMATEDATA = ms_project.getClimate();     												// Climadata string
		double longitudeinx = ms_project.getLongitude();     											// Longitude
		double latitudeinx = ms_project.getLatitude();     											// Latitude
		double meridianx = ms_project.getMeridianx();     												// Meridian
		double MAX_COMFORT_TEMP = ms_project.getMaxComfortTemp();     									// Max comfort temp
		double MIN_COMFORT_TEMP = ms_project.getMinComfortTemp();     									// Min comfort temp
		double TYPE_COMFORT_TEMP = ms_project.getTypeComfortTemp();     								// Type comfort (1 classic, 2 adaptive)
		double MAX_COMFORT_HUMIDITY = ms_project.getMaxComfortHumidity();     							// Max comfort RH
		double MIN_COMFORT_HUMIDITY = ms_project.getMinComfortHumidity();     							// Min comfort RH
		double HEATING_ENERGY_GOAL = ms_project.getHeatingEnergyGoal();     							// Goal heating energy
		double HEATING_ENERGY_ON = ms_project.getHeatingEnergyOn();     								// Heating energy on/off
		double COOLING_ENERGY_GOAL = ms_project.getCoolingEnergyGoal();     							// Goal cooling energy
		double COOLING_ENERGY_ON = ms_project.getCoolingEnergyOn();     								// Cooling energy on/off
		double INTERN_OCCUPANS = ms_project.getInternOccupans();     									// Number of occupants
		double INTERN_OCCUPANS_HEAT = ms_project.getInternOccupansHeat();     							// Heat gain occupants
		double INTERN_LIGHT = ms_project.getInternLight();     										// Heat gain light
		double INTERN_DEVICES_1 = ms_project.getInternDevices1();     									// Heat gain el device
		double INTERN_OCCUPANCY = ms_project.getInternOccupancy();     								// Type occupancy
		double PROPERTY_ORIENTATION = ms_project.getPropertyOrientation();     						// Project orientation
		double PROPERTY_VOLUME = ms_project.getPropertyVolume();     									// Project volume
		double PROPERTY_AREA = ms_project.getPropertyArea();     										// Project floor area
		double PROPERTY_NO_FLOORS = ms_project.getPropertyNoFloors();     								// Number of floors
		double PROPERTY_HEIGHT = ms_project.getPropertyHeight();     									// Max height project
		double PROPERTY_CONSTRUCTION = ms_project.getPropertyConstruction();   						// Type construction
		double PROPERTY_WALL_NORTH_A = ms_project.getPropertyWallNorthA();     						// Wall area
		double PROPERTY_WALL_SOUTH_A = ms_project.getPropertyWallSouthA();     						// Wall area
		double PROPERTY_WALL_EAST_A = ms_project.getPropertyWallEastA();     							// Wall area
		double PROPERTY_WALL_WEST_A = ms_project.getPropertyWallWestA();     							// Wall area
		double PROPERTY_ROOF_A = ms_project.getPropertyRoofA();     									// Roof area
		double PROPERTY_ROOF_ADJACENT = ms_project.getPropertyRoofAdjacent();  						// Type of roof adjacency
		double PROPERTY_FLOOR_A = ms_project.getPropertyFloorA();     									// Floor area
		double PROPERTY_FLOOR_ADJACENT = ms_project.getPropertyFloorAdjacent();						// Type of floor adjacency
		double PROPERTY_WALL_UVALUE = ms_project.getPropertyWallUvalue();     							// Wall U value
		double PROPERTY_ROOF_UVALUE = ms_project.getPropertyRoofUvalue();     							// Roof U value
		double PROPERTY_FLOOR_UVALUE = ms_project.getPropertyFloorUvalue();     						// Floor U value
		double PROPERTY_WINDOW_NORTH_P = ms_project.getPropertyWindowNorthP();     					// Window area
		double PROPERTY_WINDOW_SOUTH_P = ms_project.getPropertyWindowSouthP();     					// Window area
		double PROPERTY_WINDOW_EAST_P = ms_project.getPropertyWindowEastP();     						// Window area
		double PROPERTY_WINDOW_WEST_P = ms_project.getPropertyWindowWestP();     						// Window area
		double PROPERTY_WINDOW_UVALUE = ms_project.getPropertyWindowUvalue();     						// Window U value
		double PROPERTY_WINDOW_SHGC = ms_project.getPropertyWindowShgc();     							// Window SHGC
		double PROPERTY_WINDOW_SHADING_N = ms_project.getPropertyWindowShadingN(); 					// Shading number
		double PROPERTY_WINDOW_SHADING_S = ms_project.getPropertyWindowShadingS(); 					// Shading number
		double PROPERTY_WINDOW_SHADING_E = ms_project.getPropertyWindowShadingE(); 					// Shading number
		double PROPERTY_WINDOW_SHADING_W = ms_project.getPropertyWindowShadingW(); 					// Shading number
		double PROPERTY_VENTILATION_INFILTRATION = ms_project.getPropertyVentilationInfiltration();	// ACH infiltration
		double PROPERTY_VENTILATION_NATVENT_IO = ms_project.getPropertyVentilationNatventIo();     	// Number nat vent (0 no nat vent, 1 ACH 1.5, 2 ACH 3)
		double PROPERTY_VENTILATION_NIGHTVENT_IO = ms_project.getPropertyVentilationNightventIo();   	// Number night vent (0 no nat vent, 1 ACH 1.5, 2 ACH 3)
		double PROPERTY_VENTILATION_HYGACH = ms_project.getPropertyVentilationHygach();     			// Volume flow hygienic minimum
		double PROPERTY_VENTILATION_HEATREC = ms_project.getPropertyVentilationHeatrec();     			// Number heat recovery (0 no heat rec, 1 heat rec)
		double PROPERTY_VENTILATION_CO2 = ms_project.getPropertyVentilationCo2();     					// ACH CO2 controlled
		double C2226_IO = ms_project.getC2226Io();     												// 2226 control IO
		double ACTIVE_ENERGYDISTRIBUTION = ms_project.getActiveEnergyDistribution();     				// Number energy distribution
		double ACTIVE_AHU = ms_project.getActiveAhu();     											// Number ahu
		double ACTIVE_Heating = ms_project.getActiveHeating();     									// Number heating conv
		double ACTIVE_Cooling = ms_project.getActiveCooling();     									// Number cooling conv
		double ACTIVE_WW = ms_project.getActiveWw();     												// Number warm water heating
		double TS_DENSITY = ms_project.getTsDensity();    												// Internal thermal storage density
		double TS_C = ms_project.getTsC();    															// Internal thermal storage heat capacity
		double TS_thickness = ms_project.getTsThickness();    											// Internal thermal storage thickness
		double TS_k = ms_project.getTsK();    															// Internal thermal storage conductivity
		double ACH_NATVENT_1 = ms_project.getAchNatvent1();     										// ACH natural ventilation 1
		double ACH_NATVENT_2 = ms_project.getAchNatvent2();    										// ACH natural ventilation 2
		double ACH_NIGHTVENT_1 = ms_project.getAchNightvent1();    									// ACH night ventilation 1
		double ACH_NIGHTVENT_2 = ms_project.getAchNightvent2();    									// ACH night ventilation 2
		double HEAT_REC_EFF = ms_project.getHeatRecEff();     											// Efficiency heat recovery
		double AV_ext_T = ms_project.getAvExtT();														// Average external temperature
	
		double StoS_1 = ms_project.getStos1();
		double StoS_2 = ms_project.getStos2();
		double StoS_3 = ms_project.getStos3();
		double StoS_4 = ms_project.getStos4();
		double StoS_5 = ms_project.getStos5();
	
		double CO2e_1 = ms_project.getCo2e1();
		double CO2e_2 = ms_project.getCo2e2();
		double CO2e_3 = ms_project.getCo2e3();
		double CO2e_4 = ms_project.getCo2e4();
		double CO2e_5 = ms_project.getCo2e5();
	
		double COST_1 = ms_project.getCost1();
		double COST_2 = ms_project.getCost2();
		double COST_3 = ms_project.getCost3();
		double COST_4 = ms_project.getCost4();
		double COST_5 = ms_project.getCost5();
	
		// Division to zero risk for volume and area
		if (PROPERTY_VOLUME == 0) {
			PROPERTY_VOLUME = 0.01;
		}
		if (PROPERTY_AREA == 0) {
			PROPERTY_AREA = 0.01;
		}
		if (PROPERTY_WINDOW_NORTH_P == 0) {
			PROPERTY_WINDOW_NORTH_P = 0.01;
		}
		if (PROPERTY_WINDOW_SOUTH_P == 0) {
			PROPERTY_WINDOW_SOUTH_P = 0.01;
		}
		if (PROPERTY_WINDOW_EAST_P == 0) {
			PROPERTY_WINDOW_EAST_P = 0.01;
		}
		if (PROPERTY_WINDOW_WEST_P == 0) {
			PROPERTY_WINDOW_WEST_P = 0.01;
		}
	
		//////////////////////////////////////////
		// BEGINNING OF STATIC MAIN CALCULATION //
		//////////////////////////////////////////
	
//		double BUILDING_COMPACTNESS;
//		double PROPERTY_WALL_NORTH_A_2, PROPERTY_WALL_SOUTH_A_2, PROPERTY_WALL_EAST_A_2 , PROPERTY_WALL_WEST_A_2;
//		double PROPERTY_ROOF_A_2, PROPERTY_FLOOR_A_2;
//		int no_of_variables = 13; // Defines number of variables
	
		// Variables
//		double[][] variable_1_a_ = new double[30][10]; 
//		double[][] variable_2_a_ = new double[30][10];
//		double[][] variable_3_a_ = new double[30][10];
//		double[][] variable_4_a_ = new double[30][10];
	
		double construction_sens; 
		double WtoW_sens_N, WtoW_sens_S, WtoW_sens_E, WtoW_sens_W;
		double glazing_U_sens, glazing_SHGC_sens;
		double SC_sens_N, SC_sens_S, SC_sens_E, SC_sens_W;
		double U_roof_sens;
		double U_wall_sens;
		double U_floor_sens;
		double ACH_inf_sens;
		double nat_vent_sens;
		double night_vent_sens;
		double heat_rec_sens;
	
		// reading annual data
// first 4 from idlingTemp
		double[] Q_HEAT_y_a = new double[40]; // Annual heating energy
		double[] Q_COOL_y_a = new double[40]; // Annual cooling energy
		double[] Q_HUMIDIFICATION_y_a = new double[40]; // Annual humidification energy
		double[] Q_DEHUMIDIFICATION_y_a = new double[40]; // Annual dehumidification energy
		double[] MAX_HEATING_LOAD_a = new double[40]; // Max heating load
		double[] MAX_COOLING_LOAD_a = new double[40]; // Max cooling load
		double[] h_above_comfort_T_a = new double[40]; // Free floating temps above comfort temp
		double[] h_below_comfort_T_a = new double[40]; // Free floating temps below comfort temp
	
		/////////////////////////////////
		// FIND OPTIMAL BUILDING BEGIN //
		/////////////////////////////////
	
		double[] construction_sens_opt_ = new double[10];
	
		double[] WtoW_sens_N_opt_ = new double[10];
		double[] WtoW_sens_S_opt_ = new double[10];
		double[] WtoW_sens_E_opt_ = new double[10];
		double[] WtoW_sens_W_opt_ = new double[10];
	
		double[] glazing_U_sens_opt_ = new double[10];
		double[] glazing_SHGC_sens_opt_ = new double[10];
	
		double[] SC_sens_N_opt_ = new double[10];
		double[] SC_sens_S_opt_ = new double[10];
		double[] SC_sens_E_opt_ = new double[10];
		double[] SC_sens_W_opt_ = new double[10];
	
		double[] U_roof_sens_opt_ = new double[10];
		double[] U_wall_sens_opt_ = new double[10];
		double[] U_floor_sens_opt_ = new double[10];
		double[] ACH_inf_sens_opt_ = new double[10];
	
		int[] nat_vent_sens_opt_ = new int[10];
		int[] night_vent_sens_opt_ = new int[10];
		int[] heat_rec_sens_opt_ = new int[10];
	
		int[] construction_sens_num_ = new int[10];
	
		int[] WtoW_sens_N_num_ = new int[10];
		int[] WtoW_sens_S_num_ = new int[10];
		int[] WtoW_sens_E_num_ = new int[10];
		int[] WtoW_sens_W_num_ = new int[10];
	
		int[] glazing_U_sens_num_ = new int[10];
		int[] glazing_SHGC_sens_num_ = new int[10];
	
		int[] SC_sens_N_num_ = new int[10];
		int[] SC_sens_S_num_ = new int[10];
		int[] SC_sens_E_num_ = new int[10];
		int[] SC_sens_W_num_ = new int[10];
	
		int[] U_roof_sens_num_ = new int[10];
		int[] U_wall_sens_num_ = new int[10];
		int[] U_floor_sens_num_ = new int[10];
		int[] ACH_inf_sens_num_ = new int[10];
	
		int[] nat_vent_sens_num_ = new int[10];
		int[] night_vent_sens_num_ = new int[10];
		int[] heat_rec_sens_num_ = new int[10];
		
	
		int no_of_opt = 8;
	
		// 0 initial building
		construction_sens_opt_[0] = PROPERTY_CONSTRUCTION;
		WtoW_sens_N_opt_[0] = PROPERTY_WINDOW_NORTH_P;
		WtoW_sens_S_opt_[0] = PROPERTY_WINDOW_SOUTH_P;
		WtoW_sens_E_opt_[0] = PROPERTY_WINDOW_EAST_P;
		WtoW_sens_W_opt_[0] = PROPERTY_WINDOW_WEST_P;
		glazing_U_sens_opt_[0] = PROPERTY_WINDOW_UVALUE;
		glazing_SHGC_sens_opt_[0] = PROPERTY_WINDOW_SHGC;
		SC_sens_N_opt_[0] = PROPERTY_WINDOW_SHADING_N;
		SC_sens_S_opt_[0] = PROPERTY_WINDOW_SHADING_S;
		SC_sens_E_opt_[0] = PROPERTY_WINDOW_SHADING_E;
		SC_sens_W_opt_[0] = PROPERTY_WINDOW_SHADING_W;
		U_roof_sens_opt_[0] = PROPERTY_ROOF_UVALUE;
		U_wall_sens_opt_[0] = PROPERTY_WALL_UVALUE;
		U_floor_sens_opt_[0] = PROPERTY_FLOOR_UVALUE;
		ACH_inf_sens_opt_[0] = PROPERTY_VENTILATION_INFILTRATION;
		nat_vent_sens_opt_[0] = (int)PROPERTY_VENTILATION_NATVENT_IO;
		night_vent_sens_opt_[0] = (int)PROPERTY_VENTILATION_NIGHTVENT_IO;
		heat_rec_sens_opt_[0] = (int)PROPERTY_VENTILATION_HEATREC;
	
		// 1 heating all windows 20%
		construction_sens_opt_[1] = 4;    
		construction_sens_num_[1] = 4;
	
		WtoW_sens_N_opt_[1] = 20;	
		WtoW_sens_N_num_[1] = 2;
		WtoW_sens_S_opt_[1] = 20;	
		WtoW_sens_S_num_[1] = 2;
		WtoW_sens_E_opt_[1] = 20;	
		WtoW_sens_E_num_[1] = 2;
		WtoW_sens_W_opt_[1] = 20;	
		WtoW_sens_W_num_[1] = 2;
	
		glazing_U_sens_opt_[1] = 0.6;	
		glazing_U_sens_num_[1] = 8; 
		glazing_SHGC_sens_opt_[1] = 0.39;
	
		SC_sens_N_opt_[1] = 4;	
		SC_sens_N_num_[1] = 4;
		SC_sens_S_opt_[1] = 4;	
		SC_sens_E_opt_[1] = 4;
		SC_sens_W_opt_[1] = 4;
	
		U_roof_sens_opt_[1] = 0.1;	
		U_roof_sens_num_[1] = 1;
		U_wall_sens_opt_[1] = 0.1;	
		U_wall_sens_num_[1] = 1;
		U_floor_sens_opt_[1] = 0.1;	
		U_floor_sens_num_[1] = 1;
		ACH_inf_sens_opt_[1] = 0.08; 
		ACH_inf_sens_num_[1] = 1;
	
		nat_vent_sens_opt_[1] = 2;	
		nat_vent_sens_num_[1] = 3;
		night_vent_sens_opt_[1] = 2;	
		night_vent_sens_num_[1] = 3;
		heat_rec_sens_opt_[1] = 1;	
		heat_rec_sens_num_[1] = 2;
	
		// 2 heating windows south 60%
		construction_sens_opt_[2] = 4;	
		construction_sens_num_[2] = 4;
	
		WtoW_sens_N_opt_[2] = 20;	
		WtoW_sens_N_num_[2] = 2;
		WtoW_sens_S_opt_[2] = 60;	
		WtoW_sens_S_num_[2] = 6;
		WtoW_sens_E_opt_[2] = 20;	
		WtoW_sens_E_num_[2] = 2;
		WtoW_sens_W_opt_[2] = 20;	
		WtoW_sens_W_num_[2] = 2;
	
		glazing_U_sens_opt_[2] = 0.6;	
		glazing_U_sens_num_[2] = 8; 
		glazing_SHGC_sens_opt_[2] = 0.55;
	
		SC_sens_N_opt_[2] = 4;	
		SC_sens_N_num_[2] = 4;
		SC_sens_S_opt_[2] = 4;
		SC_sens_E_opt_[2] = 4;
		SC_sens_W_opt_[2] = 4;
	
		U_roof_sens_opt_[2] = 0.1;	
		U_roof_sens_num_[2] = 1;
		U_wall_sens_opt_[2] = 0.1;	
		U_wall_sens_num_[2] = 1;
		U_floor_sens_opt_[2] = 0.1;	
		U_floor_sens_num_[2] = 1;
		ACH_inf_sens_opt_[2] = 0.08;	
		ACH_inf_sens_num_[2] = 1;
	
		nat_vent_sens_opt_[2] = 2;	
		nat_vent_sens_num_[2] = 3;
		night_vent_sens_opt_[2] = 2;	
		night_vent_sens_num_[2] = 3;
		heat_rec_sens_opt_[2] = 1;	
		heat_rec_sens_num_[2] = 2;
	
		// 3 heating windows north 60%
		construction_sens_opt_[3] = 4;	
		construction_sens_num_[3] = 4;
	
		WtoW_sens_N_opt_[3] = 60;	
		WtoW_sens_N_num_[3] = 6;
		WtoW_sens_S_opt_[3] = 20;	
		WtoW_sens_S_num_[3] = 2;
		WtoW_sens_E_opt_[3] = 20;	
		WtoW_sens_E_num_[3] = 2;
		WtoW_sens_W_opt_[3] = 20;	
		WtoW_sens_W_num_[3] = 2;
	
		glazing_U_sens_opt_[3] = 0.6;	
		glazing_U_sens_num_[3] = 8; 
		glazing_SHGC_sens_opt_[3] = 0.55;
	
		SC_sens_N_opt_[3] = 4;	
		SC_sens_N_num_[3] = 4;
		SC_sens_S_opt_[3] = 4;
		SC_sens_E_opt_[3] = 4;
		SC_sens_W_opt_[3] = 4;
	
		U_roof_sens_opt_[3] = 0.1;	
		U_roof_sens_num_[3] = 1;
		U_wall_sens_opt_[3] = 0.1;	
		U_wall_sens_num_[3] = 1;
		U_floor_sens_opt_[3] = 0.1;	
		U_floor_sens_num_[3] = 1;
		ACH_inf_sens_opt_[3] = 0.08;	
		ACH_inf_sens_num_[3] = 1;
	
		nat_vent_sens_opt_[3] = 2;	
		nat_vent_sens_num_[3] = 3;
		night_vent_sens_opt_[3] = 2;	
		night_vent_sens_num_[3] = 3;
		heat_rec_sens_opt_[3] = 1;	
		heat_rec_sens_num_[3] = 2;
	
		// 4 heating windows 2226 no heat recovery
		construction_sens_opt_[4] = 4;	
		construction_sens_num_[4] = 4;
	
		WtoW_sens_N_opt_[4] = 20; 
		WtoW_sens_N_num_[4] = 2;
		WtoW_sens_S_opt_[4] = 20;	
		WtoW_sens_S_num_[4] = 2;
		WtoW_sens_E_opt_[4] = 20;	
		WtoW_sens_E_num_[4] = 2;
		WtoW_sens_W_opt_[4] = 20;	
		WtoW_sens_W_num_[4] = 2;
	
		glazing_U_sens_opt_[4] = 0.6;	
		glazing_U_sens_num_[4] = 8; 
		glazing_SHGC_sens_opt_[4] = 0.55;
	
		SC_sens_N_opt_[4] = 4;	
		SC_sens_N_num_[4] = 4;
		SC_sens_S_opt_[4] = 4;
		SC_sens_E_opt_[4] = 4;
		SC_sens_W_opt_[4] = 4;
	
		U_roof_sens_opt_[4] = 0.1;	
		U_roof_sens_num_[4] = 1;
		U_wall_sens_opt_[4] = 0.1;	
		U_wall_sens_num_[4] = 1;
		U_floor_sens_opt_[4] = 0.1;	
		U_floor_sens_num_[4] = 1;
		ACH_inf_sens_opt_[4] = 0.08;	
		ACH_inf_sens_num_[4] = 1;
	
		nat_vent_sens_opt_[4] = 2;	
		nat_vent_sens_num_[4] = 3;
		night_vent_sens_opt_[4] = 2;	
		night_vent_sens_num_[4] = 3;
		heat_rec_sens_opt_[4] = 0; 	
		heat_rec_sens_num_[4] = 1;
	
		// 5 mediterranean U value 0.25
		construction_sens_opt_[5] = 4;	
		construction_sens_num_[5] = 4;
	
		WtoW_sens_N_opt_[5] = 20;	
		WtoW_sens_N_num_[5] = 2;
		WtoW_sens_S_opt_[5] = 20;	
		WtoW_sens_S_num_[5] = 2;
		WtoW_sens_E_opt_[5] = 20;	
		WtoW_sens_E_num_[5] = 2;
		WtoW_sens_W_opt_[5] = 20;	
		WtoW_sens_W_num_[5] = 2;
	
		glazing_U_sens_opt_[5] = 1.7;	
		glazing_U_sens_num_[5] = 6; 
		glazing_SHGC_sens_opt_[5] = 0.72;
	
		SC_sens_N_opt_[5] = 4;	
		SC_sens_N_num_[5] = 4;
		SC_sens_S_opt_[5] = 4;
		SC_sens_E_opt_[5] = 4;
		SC_sens_W_opt_[5] = 4;
	
		U_roof_sens_opt_[5] = 0.25;	
		U_roof_sens_num_[5] = 5;
		U_wall_sens_opt_[5] = 0.25;	
		U_wall_sens_num_[5] = 5;
		U_floor_sens_opt_[5] = 0.25;	
		U_floor_sens_num_[5] = 5;
		ACH_inf_sens_opt_[5] = 0.2;	
		ACH_inf_sens_num_[5] = 4;
	
		nat_vent_sens_opt_[5] = 2;	
		nat_vent_sens_num_[5] = 3;
		night_vent_sens_opt_[5] = 2;	
		night_vent_sens_num_[5] = 3;
		heat_rec_sens_opt_[5] = 0; 	
		heat_rec_sens_num_[5] = 1;
	
		// 6 arid climate some insulation
		construction_sens_opt_[6] = 4;	
		construction_sens_num_[6] = 4;
	
		WtoW_sens_N_opt_[6] = 20;	
		WtoW_sens_N_num_[6] = 2;
		WtoW_sens_S_opt_[6] = 20;	
		WtoW_sens_S_num_[6] = 2;
		WtoW_sens_E_opt_[6] = 20;	
		WtoW_sens_E_num_[6] = 2;
		WtoW_sens_W_opt_[6] = 20;	
		WtoW_sens_W_num_[6] = 2;
	
		glazing_U_sens_opt_[6] = 1.6;	
		glazing_U_sens_num_[6] = 5; 
		glazing_SHGC_sens_opt_[6] = 0.34;
	
		SC_sens_N_opt_[6] = 4;	
		SC_sens_N_num_[6] = 4;
		SC_sens_S_opt_[6] = 4;
		SC_sens_E_opt_[6] = 4;
		SC_sens_W_opt_[6] = 4;
	
		U_roof_sens_opt_[6] = 0.5;	
		U_roof_sens_num_[6] = 7;
		U_wall_sens_opt_[6] = 0.5;	
		U_wall_sens_num_[6] = 7;
		U_floor_sens_opt_[6] = 0.5;	
		U_floor_sens_num_[6] = 7;
		ACH_inf_sens_opt_[6] = 0.25;	
		ACH_inf_sens_num_[6] = 5;
	
		nat_vent_sens_opt_[6] = 2;	
		nat_vent_sens_num_[6] = 3;
		night_vent_sens_opt_[6] = 2;	
		night_vent_sens_num_[6] = 3;
		heat_rec_sens_opt_[6] = 0;	
		heat_rec_sens_num_[6] = 1;
	
		// 7 arid climate no insulation rel air tight
		construction_sens_opt_[7] = 4;	
		construction_sens_num_[7] = 4;
	
		WtoW_sens_N_opt_[7] = 20;	
		WtoW_sens_N_num_[7] = 2;
		WtoW_sens_S_opt_[7] = 20;	
		WtoW_sens_S_num_[7] = 2;
		WtoW_sens_E_opt_[7] = 20;	
		WtoW_sens_E_num_[7] = 2;
		WtoW_sens_W_opt_[7] = 20;	
		WtoW_sens_W_num_[7] = 2;
	
		glazing_U_sens_opt_[7] = 2.8;	
		glazing_U_sens_num_[7] = 4; 
		glazing_SHGC_sens_opt_[7] = 0.3;
	
		SC_sens_N_opt_[7] = 4;	
		SC_sens_N_num_[7] = 4;
		SC_sens_S_opt_[7] = 4;
		SC_sens_E_opt_[7] = 4;
		SC_sens_W_opt_[7] = 4;
	
		U_roof_sens_opt_[7] = 0.8;	
		U_roof_sens_num_[7] = 8;
		U_wall_sens_opt_[7] = 0.8;	
		U_wall_sens_num_[7] = 8;
		U_floor_sens_opt_[7] = 0.8;	
		U_floor_sens_num_[7] = 8;
		ACH_inf_sens_opt_[7] = 0.2;	
		ACH_inf_sens_num_[7] = 4;
	
		nat_vent_sens_opt_[7] = 2;	
		nat_vent_sens_num_[7] = 3;
		night_vent_sens_opt_[7] = 2;	
		night_vent_sens_num_[7] = 3;
		heat_rec_sens_opt_[7] = 0;	
		heat_rec_sens_num_[7] = 1;
	
		// 8 arid climate no insulation not air tight
		construction_sens_opt_[8] = 2;	
		construction_sens_num_[8] = 2;
	
		WtoW_sens_N_opt_[8] = 20;	
		WtoW_sens_N_num_[8] = 2;
		WtoW_sens_S_opt_[8] = 20;	
		WtoW_sens_S_num_[8] = 2;
		WtoW_sens_E_opt_[8] = 20;	
		WtoW_sens_E_num_[8] = 2;
		WtoW_sens_W_opt_[8] = 20;	
		WtoW_sens_W_num_[8] = 2;
	
		glazing_U_sens_opt_[8] = 2.8;	
		glazing_U_sens_num_[8] = 4; 
		glazing_SHGC_sens_opt_[8] = 0.3;
	
		SC_sens_N_opt_[8] = 4;	
		SC_sens_N_num_[8] = 4;
		SC_sens_S_opt_[8] = 4;
		SC_sens_E_opt_[8] = 4;
		SC_sens_W_opt_[8] = 4;
	
		U_roof_sens_opt_[8] = 0.8;	
		U_roof_sens_num_[8] = 8;
		U_wall_sens_opt_[8] = 0.8;	
		U_wall_sens_num_[8] = 8;
		U_floor_sens_opt_[8] = 0.8;	
		U_floor_sens_num_[8] = 8;
		ACH_inf_sens_opt_[8] = 0.5;	
		ACH_inf_sens_num_[8] = 7;
	
		nat_vent_sens_opt_[8] = 2;	
		nat_vent_sens_num_[8] = 3;
		night_vent_sens_opt_[8] = 2;	
		night_vent_sens_num_[8] = 3;
		heat_rec_sens_opt_[8] = 0;	
		heat_rec_sens_num_[8] = 1;
	
		////////////////////////////////////////////
		// LOOP TO RUN SIMULATION FOR SENSITIVITY //
		////////////////////////////////////////////
	
		for (int iloop_opt = 0; iloop_opt < no_of_opt; iloop_opt++) {
			// Initial Values
//construction
			construction_sens = construction_sens_opt_[iloop_opt];
//PROPERTY_WINDOW_NORTH_P
			WtoW_sens_N = WtoW_sens_N_opt_[iloop_opt];
			WtoW_sens_S = WtoW_sens_S_opt_[iloop_opt];
			WtoW_sens_E = WtoW_sens_E_opt_[iloop_opt];
			WtoW_sens_W = WtoW_sens_W_opt_[iloop_opt];
// Window U value
// Window SHGC
			glazing_U_sens = glazing_U_sens_opt_[iloop_opt];
			glazing_SHGC_sens = glazing_SHGC_sens_opt_[iloop_opt];
//shadingN,only for MAIN_SHGC 
			SC_sens_N = SC_sens_N_opt_[iloop_opt];
			SC_sens_S = SC_sens_S_opt_[iloop_opt];
			SC_sens_E = SC_sens_E_opt_[iloop_opt];
			SC_sens_W = SC_sens_W_opt_[iloop_opt];
//PROPERTY_WALL_UVALUE 
//PROPERTY_ROOF_UVALUE   
//PROPERTY_FLOOR_UVALUE
			U_roof_sens = U_roof_sens_opt_[iloop_opt];
			U_wall_sens = U_wall_sens_opt_[iloop_opt];
			U_floor_sens = U_floor_sens_opt_[iloop_opt];
			
//PROPERTY_VENTILATION_INFILTRATION 
//PROPERTY_VENTILATION_NATVENT_IO     
//PROPERTY_VENTILATION_NIGHTVENT_IO 
			ACH_inf_sens = ACH_inf_sens_opt_[iloop_opt];
			nat_vent_sens = nat_vent_sens_opt_[iloop_opt];
			night_vent_sens = night_vent_sens_opt_[iloop_opt];
			heat_rec_sens = heat_rec_sens_opt_[iloop_opt];
	    		    		    	
			//Determine the value set for construction.
			if(construction_sens==1.0){
				ms_project.setTsDensity(600.0);
				ms_project.setTsC(650.0);
				ms_project.setTsThickness(0.015);
				ms_project.setTsK(0.42);
			}else if(construction_sens==2.0){
				ms_project.setTsDensity(700.0);
				ms_project.setTsC(800.0);
				ms_project.setTsThickness(0.017);
				ms_project.setTsK(0.55);
			}else if(construction_sens==3.0){
				ms_project.setTsDensity(900.0);
				ms_project.setTsC(800.0);
				ms_project.setTsThickness(0.025);
				ms_project.setTsK(0.55);
			}else if(construction_sens==4.0){
				ms_project.setTsDensity(2000.0);
				ms_project.setTsC(1100.0);
				ms_project.setTsThickness(0.2);
				ms_project.setTsK(1.8);	
			}
			
			ms_project.setPropertyWindowNorthP(WtoW_sens_N);
			ms_project.setPropertyWindowSouthP(WtoW_sens_S);
			ms_project.setPropertyWindowEastP(WtoW_sens_E);
			ms_project.setPropertyWindowWestP(WtoW_sens_W);
			ms_project.setPropertyWindowUvalue(glazing_U_sens);
			ms_project.setPropertyWindowShgc(glazing_SHGC_sens);
			ms_project.setPropertyWallUvalue(U_wall_sens);
			ms_project.setPropertyRoofUvalue(U_roof_sens);
			ms_project.setPropertyFloorUvalue(U_floor_sens);
			ms_project.setPropertyVentilationInfiltration(ACH_inf_sens);
			ms_project.setPropertyVentilationNatventIo(nat_vent_sens);
			ms_project.setPropertyVentilationNightventIo(night_vent_sens);
			ms_project.setPropertyVentilationHeatrec(heat_rec_sens);
			
			// run nidling
			NIdlingTemperature it = null;
			try {
				it = new NIdlingTemperature(ms_fClimate, ms_project);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JAXBException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			it.computeSHGC();
			it.computeDailyTemperature();
			Q_HEAT_y_a[iloop_opt] = it.getQ_HEAT_y_s(); // Annual heating energy
			Q_COOL_y_a[iloop_opt] = it.getQ_COOL_y_s(); // Annual cooling energy
			Q_HUMIDIFICATION_y_a[iloop_opt] = it.getQ_HUMIDIFICATION_y_s(); // Annual humidification energy
			Q_DEHUMIDIFICATION_y_a[iloop_opt] = it.getQ_DEHUMIDIFICATION_y_s(); // Annual dehumidification energy
		}
	
		//////////////////////////////////
		// FIND OPTIMAL BUILDING DESIGN //
		//////////////////////////////////
	
		// Ranking
		int no_of_ranks = 10;
		double[] rank_value_in = new double[30];
		double[] rank_value_internal = new double[30];
		int[] rank_internal = new int[30];
		int[] rank_no_out = new int[30];
		double[] rank_value_out = new double[30];
		int internal_number = 0;
		int internal_signal = 0;
	
		double[] Q_opt_1_ = new double[20]; // Energy demand optimization
	
		int best_opt; // Number of best building option
		
	
		
		for (int opt_1 = 0; opt_1 <= no_of_opt; opt_1++) {
			Q_opt_1_[opt_1] = HEATING_ENERGY_ON * (Q_HEAT_y_a[opt_1] + Q_HUMIDIFICATION_y_a[opt_1]) + COOLING_ENERGY_ON * (Q_COOL_y_a[opt_1] + Q_DEHUMIDIFICATION_y_a[opt_1]);
			rank_value_in[opt_1] = Q_opt_1_[opt_1];
		}
	
		
		 no_of_opt = 14;
		 
		// Ranks the data
		for (int rank_1 = 0; rank_1 < no_of_opt; rank_1++) {		
			for (int rank_3 = 0; rank_3 < no_of_ranks; rank_3++) {
				rank_value_internal[rank_3] = rank_value_in[rank_3];
			}
			internal_signal = 0;
			for (int rank_2 = 0; rank_2 < no_of_opt; rank_2++) { // Search for smallest best <, search for largest best >
				if (rank_value_internal[rank_2] < rank_value_internal[rank_1]) {
					rank_value_out[rank_1] = rank_value_internal[rank_2];
					rank_value_internal[rank_1] = rank_value_internal[rank_2];
					rank_no_out[rank_1] = rank_2;
					internal_number = rank_2;
					internal_signal = 1;
				}		
			}
			if(internal_signal == 0) {
				rank_value_out[rank_1] = rank_value_internal[rank_1];
				rank_no_out[rank_1] = rank_1;
				rank_value_in[rank_1]= 1000000;	// Search for smallest best 1000000, search for largest best -1000000
			}
			rank_value_in[internal_number]= 1000000; // Search for smallest best 1000000, search for largest best -1000000	
		}
	
		best_opt = rank_no_out[0] ; // Indicates best building property
	
		/////////////////////////////////
		// FIND OPTIMAL BUILDING BEGIN //
		/////////////////////////////////
	
		no_of_sens = 14;
		// Loop to run simulations for sensitivity
		for (int iloop = 0; iloop < no_of_sens; iloop++) {
			// initial values
			construction_sens = PROPERTY_CONSTRUCTION;
			WtoW_sens_N = PROPERTY_WINDOW_NORTH_P;
			WtoW_sens_S = PROPERTY_WINDOW_SOUTH_P;
			WtoW_sens_E = PROPERTY_WINDOW_EAST_P;
			WtoW_sens_W = PROPERTY_WINDOW_WEST_P;
			glazing_U_sens = PROPERTY_WINDOW_UVALUE;
			glazing_SHGC_sens = PROPERTY_WINDOW_SHGC;
			SC_sens_N = PROPERTY_WINDOW_SHADING_N;
			SC_sens_S = PROPERTY_WINDOW_SHADING_S;
			SC_sens_E = PROPERTY_WINDOW_SHADING_E;
			SC_sens_W = PROPERTY_WINDOW_SHADING_W;
			U_roof_sens = PROPERTY_ROOF_UVALUE;
			U_wall_sens = PROPERTY_WALL_UVALUE;
			U_floor_sens = PROPERTY_FLOOR_UVALUE;
			ACH_inf_sens = PROPERTY_VENTILATION_INFILTRATION;
			nat_vent_sens = PROPERTY_VENTILATION_NATVENT_IO;
			night_vent_sens = PROPERTY_VENTILATION_NIGHTVENT_IO;
			heat_rec_sens = PROPERTY_VENTILATION_HEATREC;
	
			// Definition
			// 1 construction 
			if (iloop == 1 ) {
				construction_sens = construction_sens_opt_[best_opt];
			}
	
			// 2 window to wall ratio N	
			if (iloop == 2 ) {
				WtoW_sens_N = WtoW_sens_N_opt_[best_opt];
				WtoW_sens_S = WtoW_sens_S_opt_[best_opt];
				WtoW_sens_E	= WtoW_sens_E_opt_[best_opt];
				WtoW_sens_W	= WtoW_sens_W_opt_[best_opt];
			}
	
			// 3 glazing type
			if (iloop == 3 ) {
				glazing_U_sens = glazing_U_sens_opt_[best_opt];
				glazing_SHGC_sens = glazing_SHGC_sens_opt_[best_opt];
			}
	
			// 4 shading
			if (iloop == 4 ) {
				SC_sens_N = SC_sens_N_opt_[best_opt];
				SC_sens_S = SC_sens_S_opt_[best_opt];
				SC_sens_E = SC_sens_E_opt_[best_opt];
				SC_sens_W = SC_sens_W_opt_[best_opt];
			}
	
			// 5 roof insulation	
			if (iloop == 5 ) {
				U_roof_sens	= U_roof_sens_opt_[best_opt];
			}
	
			// 6 wall insulation	
			if (iloop == 6 ) {
				U_wall_sens = U_wall_sens_opt_[best_opt];
			}
	
			// 7 floor insulation
			if (iloop == 7 ) {
				U_floor_sens = U_floor_sens_opt_[best_opt];
			}
	
			// 8 air tightness	
			if (iloop == 8 ) {
				ACH_inf_sens = ACH_inf_sens_opt_[best_opt];
			}
	
			// 9 natural ventilation	
			if (iloop == 9 ) {
				nat_vent_sens = nat_vent_sens_opt_[best_opt];
			}
	
			// 10 night ventilation	
			if (iloop == 10 ) {
				night_vent_sens = night_vent_sens_opt_[best_opt];
			}
			// 11 heat recovery
			if (iloop == 11 ) {
				heat_rec_sens = heat_rec_sens_opt_[best_opt];
			}
	
			// 12 construction + night vent
			if (iloop == 12 ) {
				construction_sens = construction_sens_opt_[best_opt];
				night_vent_sens = night_vent_sens_opt_[best_opt];
			}
	
			// 13 glazing + shading
			if (iloop == 13 ) {
				glazing_U_sens = glazing_U_sens_opt_[best_opt];
				glazing_SHGC_sens = glazing_SHGC_sens_opt_[best_opt];
				SC_sens_N = SC_sens_N_opt_[best_opt];
				SC_sens_S = SC_sens_S_opt_[best_opt];
				SC_sens_E = SC_sens_E_opt_[best_opt];
				SC_sens_W = SC_sens_W_opt_[best_opt];
			}
			
			//Determine the value set for construction.
			if(construction_sens==1.0){
				ms_project.setTsDensity(600.0);
				ms_project.setTsC(650.0);
				ms_project.setTsThickness(0.015);
				ms_project.setTsK(0.42);
			}else if(construction_sens==2.0){
				ms_project.setTsDensity(700.0);
				ms_project.setTsC(800.0);
				ms_project.setTsThickness(0.017);
				ms_project.setTsK(0.55);
			}else if(construction_sens==3.0){
				ms_project.setTsDensity(900.0);
				ms_project.setTsC(800.0);
				ms_project.setTsThickness(0.025);
				ms_project.setTsK(0.55);
			}else if(construction_sens==4.0){
				ms_project.setTsDensity(2000.0);
				ms_project.setTsC(1100.0);
				ms_project.setTsThickness(0.2);
				ms_project.setTsK(1.8);	
			}
			
			ms_project.setPropertyWindowNorthP(WtoW_sens_N);
			ms_project.setPropertyWindowSouthP(WtoW_sens_S);
			ms_project.setPropertyWindowEastP(WtoW_sens_E);
			ms_project.setPropertyWindowWestP(WtoW_sens_W);
			ms_project.setPropertyWindowUvalue(glazing_U_sens);
			ms_project.setPropertyWindowShgc(glazing_SHGC_sens);
			ms_project.setPropertyWallUvalue(U_wall_sens);
			ms_project.setPropertyRoofUvalue(U_roof_sens);
			ms_project.setPropertyFloorUvalue(U_floor_sens);
			ms_project.setPropertyVentilationInfiltration(ACH_inf_sens);
			ms_project.setPropertyVentilationNatventIo(nat_vent_sens);
			ms_project.setPropertyVentilationNightventIo(night_vent_sens);
			ms_project.setPropertyVentilationHeatrec(heat_rec_sens);
			
			// run nidling
			NIdlingTemperature it = null;
			try {
				it = new NIdlingTemperature(ms_fClimate, ms_project);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JAXBException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			it.computeSHGC();
			it.computeDailyTemperature();
			Q_HEAT_y_a[iloop+8] = it.getQ_HEAT_y_s(); // Annual heating energy
			Q_COOL_y_a[iloop+8] = it.getQ_COOL_y_s(); // Annual cooling energy
			Q_HUMIDIFICATION_y_a[iloop+8] = it.getQ_HUMIDIFICATION_y_s(); // Annual humidification energy
			Q_DEHUMIDIFICATION_y_a[iloop+8] = it.getQ_DEHUMIDIFICATION_y_s(); // Annual dehumidification energy
			
		}	
	
		////////////////////////////
		// STATISTICS FOR DIAGRAM //
		////////////////////////////
	
		double[] sensitivity_diagram = new double[no_of_sens];
		double[] sensitivity_diagram_diff = new double[no_of_sens];
	
		for (int sens_1 = 1; sens_1 < no_of_sens; sens_1++) {
			sensitivity_diagram[sens_1] = (HEATING_ENERGY_ON * Q_HEAT_y_a[0] + COOLING_ENERGY_ON * Q_COOL_y_a[0] + HEATING_ENERGY_ON * Q_HUMIDIFICATION_y_a[0] + COOLING_ENERGY_ON * Q_DEHUMIDIFICATION_y_a[0]) - (HEATING_ENERGY_ON * (Q_HEAT_y_a[sens_1] + Q_HUMIDIFICATION_y_a[sens_1])) - (COOLING_ENERGY_ON * (Q_COOL_y_a[sens_1] + Q_DEHUMIDIFICATION_y_a[sens_1]));
			if (sensitivity_diagram[sens_1] < 0.01 && sensitivity_diagram[sens_1] > -0.01) {
				sensitivity_diagram[sens_1] = 0;
			}	
			rank_value_in[sens_1] = sensitivity_diagram[sens_1];
		}
	
		// Ranking
		no_of_sens = 14;
	
		// Ranks the data
		for (int rank_1 = 1; rank_1 < no_of_sens; rank_1++) {
			for (int rank_3 = 1; rank_3 < no_of_sens; rank_3++) {
				rank_value_internal[rank_3] = rank_value_in[rank_3];
			}
			internal_signal = 0;
			for (int rank_2 = 1; rank_2 < no_of_sens; rank_2++) {
				if (rank_value_internal[rank_2] > rank_value_internal[rank_1]) { // Search for smallest best <, search for largest best >
					rank_value_out[rank_1] = rank_value_internal[rank_2];
					rank_value_internal[rank_1] = rank_value_internal[rank_2];
					rank_no_out[rank_1] = rank_2;
					internal_number = rank_2;
					internal_signal = 1;
				}		
			}
			if (internal_signal == 0) {
				rank_value_out[rank_1] = rank_value_internal[rank_1];
				rank_no_out[rank_1] = rank_1;
				rank_value_in[rank_1] = -10000;	// Search for smallest best 1000000, search for largest best -1000000
			}
			rank_value_in[internal_number]= -10000; // Search for smallest best 1000000, search for largest best -1000000	
		}
	
		no_of_sens = 14;
	
		int[] rank_option_no = new int[30];
		double[] rank_option_value = new double[30];
		int internal_number_x = 0;
		double[] option_value_out = new double[30];
		double[] option_value_final = new double[30];
		double internal_value = 0;
		int[] option_rank_save = new int[30];
	
		for (int iresult2 = 1; iresult2 < no_of_sens; iresult2++) {
			rank_option_no[iresult2] = rank_no_out[iresult2];
			rank_option_value[iresult2] = rank_value_out[iresult2];
			internal_number_x = rank_option_no[iresult2];
			internal_value = rank_option_value[iresult2];
			option_rank_out[iresult2]= internal_number_x;
			option_value_out[internal_number_x] = internal_value;
			option_value_final[iresult2] = option_value_out[internal_number_x];
			option_rank_save[iresult2] = internal_number_x;
		}
	
		// Calculate sum of optimizations
		double sum_difference_calc = 0;
	
		for (int iresult4 = 1; iresult4 < no_of_sens; iresult4++) {
			if (option_value_final[iresult4] > 0 ) {
				sum_difference_calc = sum_difference_calc + option_value_final[iresult4];
			}
		}
	
		// Evaluate importance
		double difference_current_goal;
		double difference_optimum_goal;
	
		double percentage_current_goal;
		double percentage_optimum_goal;
	
		double difference_current_optimum;
		double Q_current;
		double percentage_current_optimum;
	
		Q_current = (HEATING_ENERGY_ON * Q_HEAT_y_a[0] + COOLING_ENERGY_ON * Q_COOL_y_a[0] + HEATING_ENERGY_ON * Q_HUMIDIFICATION_y_a[0] + COOLING_ENERGY_ON * Q_DEHUMIDIFICATION_y_a[0]); 
	
		percentage_current_goal = Q_opt_1_[best_opt] / Q_current;
		percentage_optimum_goal = Q_opt_1_[best_opt] / HEATING_ENERGY_GOAL; // Calculates the percentage of how far the goal is from the optimum
		difference_current_goal = Q_current - HEATING_ENERGY_GOAL;
		difference_optimum_goal = HEATING_ENERGY_GOAL - Q_opt_1_[best_opt]; // Calculates the difference between goal and optimum
	
		difference_current_optimum = Q_current - difference_optimum_goal;
	
		percentage_current_optimum = difference_current_goal / difference_current_optimum;
	
		// Identifies if goal can be achieved
		// Definition, if project goal can be achieved
		// 0 = goal not achievable; 1 = goal achievable; 2 = goal higher then current project performance
		int GOAL_IO; // 1 energy goal can be achieved, 0 goal cannot beachieved
	
		if (HEATING_ENERGY_GOAL < Q_opt_1_[best_opt] &&  HEATING_ENERGY_GOAL < Q_current) {
			GOAL_IO = 0;
		}
		else if (HEATING_ENERGY_GOAL > Q_opt_1_[best_opt] &&  HEATING_ENERGY_GOAL < Q_current) {
			GOAL_IO = 1;
		}
		else if (HEATING_ENERGY_GOAL > Q_current) {
			GOAL_IO = 2;
		}
		else {
			GOAL_IO = 1;
		}
	
		// Percentage transfer
		int PERCENT_IO = 0;
	
		if(percentage_optimum_goal > 0.85) {
			PERCENT_IO = 0;
		}
		else if(percentage_optimum_goal < 0.4) {
			PERCENT_IO = 1;
		}
		else {
			PERCENT_IO = 2;
		}
	
		// Calculate percent of optimization options
		double sum_difference_percent=0;
		double internal_percentage=0;
	
		int[] recom_sens_IO_ = new int[no_of_sens];
		int internal_recom_sens;
	
		for (int iresult5 = 1; iresult5 < no_of_sens; iresult5++) {
			if (option_value_final[iresult5] > 0 ) {
				internal_percentage = option_value_final[iresult5] / sum_difference_calc;
				sum_difference_percent = sum_difference_percent + internal_percentage;
				internal_recom_sens = option_rank_out[iresult5];
				if (sum_difference_percent < percentage_current_optimum) {
					recom_sens_IO_[internal_recom_sens] = 1;
				} 
				else {
					recom_sens_IO_[internal_recom_sens] = 0;
				}
			}
		}
	
		// Analysis recommendation loop
		int rec_sens_1 = 0;
		int rec_sens_2 = 0;
		int rec_sens_3 = 0;
		int rec_sens_4 = 0;
		int rec_sens_5 = 0;
		int rec_sens_6 = 0;
		int rec_sens_7 = 0;
		int rec_sens_8 = 0;
		int rec_sens_9 = 0;
		int rec_sens_10 = 0;
		int rec_sens_11 = 0;
		int rec_sens_12 = 0;
		int rec_sens_13 = 0;
	
		double current_to_GOAL_Q = 0;
		int counter_to_GOAL = 0;
		int int_counter_to_GOAL = 0;
		int iloop = 1;
	
		// Initial values
		construction_sens = PROPERTY_CONSTRUCTION;
		WtoW_sens_N = PROPERTY_WINDOW_NORTH_P;
		WtoW_sens_S = PROPERTY_WINDOW_SOUTH_P;
		WtoW_sens_E = PROPERTY_WINDOW_EAST_P;
		WtoW_sens_W = PROPERTY_WINDOW_WEST_P;
		glazing_U_sens = PROPERTY_WINDOW_UVALUE;
		glazing_SHGC_sens = PROPERTY_WINDOW_SHGC;
		SC_sens_N = PROPERTY_WINDOW_SHADING_N;
		SC_sens_S = PROPERTY_WINDOW_SHADING_S;
		SC_sens_E = PROPERTY_WINDOW_SHADING_E;
		SC_sens_W = PROPERTY_WINDOW_SHADING_W;
		U_roof_sens = PROPERTY_ROOF_UVALUE;
		U_wall_sens = PROPERTY_WALL_UVALUE;
		U_floor_sens = PROPERTY_FLOOR_UVALUE;
		ACH_inf_sens = PROPERTY_VENTILATION_INFILTRATION;
		nat_vent_sens = PROPERTY_VENTILATION_NATVENT_IO;
		night_vent_sens = PROPERTY_VENTILATION_NIGHTVENT_IO;
		heat_rec_sens = PROPERTY_VENTILATION_HEATREC;
	
		current_to_GOAL_Q = Q_current;
	
		while (current_to_GOAL_Q > HEATING_ENERGY_GOAL  && iloop <= no_of_sens) {
	
			int_counter_to_GOAL = option_rank_save[iloop];
	
			// definition
			// 1 construction 
			if(int_counter_to_GOAL == 1 ) {
				construction_sens = construction_sens_opt_[best_opt];
				rec_sens_1 = 1;
			}
	
			// 2 window to wall ratio N	
			if (int_counter_to_GOAL == 2 ) {
				WtoW_sens_N	= WtoW_sens_N_opt_[best_opt];
				WtoW_sens_S	= WtoW_sens_S_opt_[best_opt];
				WtoW_sens_E	= WtoW_sens_E_opt_[best_opt];
				WtoW_sens_W	= WtoW_sens_W_opt_[best_opt];
				rec_sens_2 = 1;
			}
	
			// 3 glazing type
			if (int_counter_to_GOAL == 3 ) {
				glazing_U_sens = glazing_U_sens_opt_[best_opt];
				glazing_SHGC_sens = glazing_SHGC_sens_opt_[best_opt];
				rec_sens_3 = 1;
			}
	
			// 4 shading
			if (int_counter_to_GOAL == 4 ) {
				SC_sens_N = SC_sens_N_opt_[best_opt];
				SC_sens_S = SC_sens_S_opt_[best_opt];
				SC_sens_E = SC_sens_E_opt_[best_opt];
				SC_sens_W = SC_sens_W_opt_[best_opt];
				rec_sens_4 = 1;
			}
	
			// 5 roof insulation	
			if (int_counter_to_GOAL == 5 ) {
				U_roof_sens	= U_roof_sens_opt_[best_opt];
				rec_sens_5 = 1;
			}
	
			// 6 wall insulation	
			if (int_counter_to_GOAL == 6 ) {
				U_wall_sens	= U_wall_sens_opt_[best_opt];
				rec_sens_6 = 1;
			}
	
			// 7 floor insulation
			if (int_counter_to_GOAL == 7 ) {
				U_floor_sens = U_floor_sens_opt_[best_opt];
				rec_sens_7 = 1;
			}
	
			// 8 air tightness
			if (int_counter_to_GOAL == 8 ) {
				ACH_inf_sens = ACH_inf_sens_opt_[best_opt];
				rec_sens_8 = 1;
			}
	
			// 9 natural ventilation
			if (int_counter_to_GOAL == 9 ) {
				nat_vent_sens = nat_vent_sens_opt_[best_opt];
				rec_sens_9 = 1;
			}
	
			// 10 night ventilation
			if (int_counter_to_GOAL == 10 ) {
				night_vent_sens	= night_vent_sens_opt_[best_opt];
				rec_sens_10 = 1;
			}
	
			// 11 heat recovery
			if (int_counter_to_GOAL == 11 ) {
				heat_rec_sens = heat_rec_sens_opt_[best_opt];
				rec_sens_11 = 1;
			}
	
			// 12 construction+night vent
			if (int_counter_to_GOAL == 12 ) {
				construction_sens = construction_sens_opt_[best_opt];
				night_vent_sens = night_vent_sens_opt_[best_opt];
				rec_sens_12 = 1;
			}
	
			// 13 glazing+shading
			if (int_counter_to_GOAL == 13 ) {
				glazing_U_sens = glazing_U_sens_opt_[best_opt];
				glazing_SHGC_sens = glazing_SHGC_sens_opt_[best_opt];
				SC_sens_N = SC_sens_N_opt_[best_opt];
				SC_sens_S = SC_sens_S_opt_[best_opt];
				SC_sens_E = SC_sens_E_opt_[best_opt];
				SC_sens_W = SC_sens_W_opt_[best_opt];
				rec_sens_13 = 1;
			}

			ms_project.setPropertyWindowNorthP(WtoW_sens_N);
			ms_project.setPropertyWindowSouthP(WtoW_sens_S);
			ms_project.setPropertyWindowEastP(WtoW_sens_E);
			ms_project.setPropertyWindowWestP(WtoW_sens_W);
			ms_project.setPropertyWindowUvalue(glazing_U_sens);
			ms_project.setPropertyWindowShgc(glazing_SHGC_sens);
			ms_project.setPropertyWallUvalue(U_wall_sens);
			ms_project.setPropertyRoofUvalue(U_roof_sens);
			ms_project.setPropertyFloorUvalue(U_floor_sens);
			ms_project.setPropertyVentilationInfiltration(ACH_inf_sens);
			ms_project.setPropertyVentilationNatventIo(nat_vent_sens);
			ms_project.setPropertyVentilationNightventIo(night_vent_sens);
			ms_project.setPropertyVentilationHeatrec(heat_rec_sens);
			
			// run nidling
			NIdlingTemperature it = null;
			try {
				it = new NIdlingTemperature(ms_fClimate, ms_project);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JAXBException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			it.computeSHGC();
			it.computeDailyTemperature();
			Q_HEAT_y_a[iloop+21] = it.getQ_HEAT_y_s(); // Annual heating energy
			Q_COOL_y_a[iloop+21] = it.getQ_COOL_y_s(); // Annual cooling energy
			Q_HUMIDIFICATION_y_a[iloop+21] = it.getQ_HUMIDIFICATION_y_s(); // Annual humidification energy
			Q_DEHUMIDIFICATION_y_a[iloop+21] = it.getQ_DEHUMIDIFICATION_y_s(); // Annual dehumidification energy
			
			current_to_GOAL_Q = HEATING_ENERGY_ON * (Q_HEAT_y_a[iloop] + Q_HUMIDIFICATION_y_a[iloop]) + COOLING_ENERGY_ON * (Q_COOL_y_a[iloop] + Q_DEHUMIDIFICATION_y_a[iloop]);
			
			iloop++;
		}
	
		
		
		double[] sensitivity_diagram_x = new double[30];
	
		// 1 construction
		if (rec_sens_12 == 1) {
			rec_sens_1 = 1; 
		}
	
		// 3 glazing type
		if (rec_sens_13 == 1) {
			rec_sens_3 = 1; 
		}
	
		// 4 shading
		if (rec_sens_13 == 1) {
			rec_sens_4 = 1; 
		}
	
		// 10 night ventilation
		if (rec_sens_12 == 1) {
			rec_sens_10 = 1; 
		} 
		else {
			rec_sens_10 = 0; 
		}
		
		// opt_rank
		OPT_REC_out[0] = (int) construction_sens_opt_[best_opt];
		OPT_REC_out[1] = WtoW_sens_N_num_[best_opt];
		OPT_REC_out[2] = glazing_U_sens_num_[best_opt];
		OPT_REC_out[3] = SC_sens_N_num_[best_opt];
		OPT_REC_out[4] = U_roof_sens_num_[best_opt];
		OPT_REC_out[5] = U_wall_sens_num_[best_opt];	
		OPT_REC_out[6] = U_floor_sens_num_[best_opt];
		OPT_REC_out[7] = ACH_inf_sens_num_[best_opt];
		OPT_REC_out[8] = nat_vent_sens_num_[best_opt];
		OPT_REC_out[9] = night_vent_sens_num_[best_opt];
		OPT_REC_out[10] = heat_rec_sens_num_[best_opt];
	
		// rank
		option_rank_out[27] = PERCENT_IO;
		option_rank_out[28] = GOAL_IO;
		option_rank_out[29] = iloop;
		
		// save ranks and opt_ranks to DB
		ms_project.setOptRank1(OPT_REC_out[1]);
		ms_project.setOptRank2(OPT_REC_out[2]);
		ms_project.setOptRank3(OPT_REC_out[3]);
		ms_project.setOptRank4(OPT_REC_out[4]);
		ms_project.setOptRank5(OPT_REC_out[5]);
		ms_project.setOptRank6(OPT_REC_out[6]);
		ms_project.setOptRank7(OPT_REC_out[7]);
		ms_project.setOptRank8(OPT_REC_out[8]);
		ms_project.setOptRank9(OPT_REC_out[9]);
		ms_project.setOptRank10(OPT_REC_out[10]);
		ms_project.setOptRank11(OPT_REC_out[11]);
		
		ms_project.setRank28(option_rank_out[27]);
		ms_project.setRank29(option_rank_out[28]);
		ms_project.setRank30(option_rank_out[29]);
		
// output
// squares
		REC_SENS_RESULT[0] = rec_sens_1;
		REC_SENS_RESULT[1] = rec_sens_2;
		REC_SENS_RESULT[2] = rec_sens_3;
		REC_SENS_RESULT[3] = rec_sens_4;
		REC_SENS_RESULT[4] = rec_sens_5;
		REC_SENS_RESULT[5] = rec_sens_6;
		REC_SENS_RESULT[6] = rec_sens_7;
		REC_SENS_RESULT[7] = rec_sens_8;
		REC_SENS_RESULT[8] = rec_sens_9;
		REC_SENS_RESULT[9] = rec_sens_10;
		REC_SENS_RESULT[10] = rec_sens_11;
	
		
		
		ms_project.setRank1(rec_sens_1);
		ms_project.setRank2(rec_sens_2);
		ms_project.setRank3(rec_sens_3);
		ms_project.setRank4(rec_sens_4);
		ms_project.setRank5(rec_sens_5);
		ms_project.setRank6(rec_sens_6);
		ms_project.setRank7(rec_sens_7);
		ms_project.setRank8(rec_sens_8);
		ms_project.setRank9(rec_sens_9);
		ms_project.setRank10(rec_sens_10);
		ms_project.setRank11(rec_sens_11);
// output
// bars
		OPT_REC_RESULT[0] = option_value_out[1];
		OPT_REC_RESULT[1] = option_value_out[2];
		OPT_REC_RESULT[2] = option_value_out[3];
		OPT_REC_RESULT[3] = option_value_out[4];
		OPT_REC_RESULT[4] = option_value_out[5];
		OPT_REC_RESULT[5] = option_value_out[6];
		OPT_REC_RESULT[6] = option_value_out[7];
		OPT_REC_RESULT[7] = option_value_out[8];
		OPT_REC_RESULT[8] = option_value_out[9];
		OPT_REC_RESULT[9] = option_value_out[10];
		OPT_REC_RESULT[10] = option_value_out[11];
	
	}
}
