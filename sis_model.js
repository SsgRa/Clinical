class SIS{
  constructor(
    N_ = 1000,
    I0_ = 1,
    beta_ = 1,
    gamma_ = 1/14
    )
  {
    // population
  this.N = N_;
    // infected 
  this.I0 = I0_;
    // susceptible
  this.S0 = this.N-this.I0;
     //infection rate
  this.beta = beta_;
    //recovery rate
    this.gamma = gamma_;
    
    // helper variables
    this.I_inf = (1-this.gamma/this.beta)*this.N;
    this.V = this.I_inf/this.I0 -1;
  }
  
  getInfectedProb(t){
    
    I = this.I_inf/(1+this.V*Math.exp(-(this.beta-this.gamma)*t));
     
    return I/this.N;
    
  }
  getSusceptibleProb(t){
    S = this.N - getInfectedProb(t);
    return S;
  }
  
  
  
}