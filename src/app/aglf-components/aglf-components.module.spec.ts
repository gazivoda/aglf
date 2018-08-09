import { AglfComponentsModule } from './aglf-components.module';

describe('AglfComponentsModule', () => {
  let aglfComponentsModule: AglfComponentsModule;

  beforeEach(() => {
    aglfComponentsModule = new AglfComponentsModule();
  });

  it('should create an instance', () => {
    expect(aglfComponentsModule).toBeTruthy();
  });
});
