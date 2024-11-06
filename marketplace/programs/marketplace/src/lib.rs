use anchor_lang::prelude::*;

declare_id!("AXrK9LKGhy9yneE2Nnk7amEut8MCq6HGMCrtEqrykUjG");

pub mod state;
pub mod instructions;
pub mod errors;

pub use instruction::*;
pub use errors::*;

#[program]
pub mod marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
