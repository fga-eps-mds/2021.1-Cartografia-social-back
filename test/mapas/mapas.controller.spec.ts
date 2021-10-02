import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { MapasController } from '../../src/mapas/mapas.controller';

describe('MapasController', () => {
  let controller: MapasController;

  const customModule = async (fn: any) => {
    return await Test.createTestingModule({
      providers: [
        {
          provide: 'MAPA_SERVICE',
          useValue: {
            send: fn,
          },
        },
      ],
      controllers: [MapasController],
    }).compile();
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'MAPA_SERVICE',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
      controllers: [MapasController],
    }).compile();

    controller = module.get<MapasController>(MapasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Create a point ', async () => {
    const id = { id: '123' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(id))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(
      await controller.createPoint({
        title: 'teste',
        description: 'teste',
        latitude: 0,
        longitude: 0,
      }),
    ).toBe(id);
  });

  it('Get a area ', async () => {
    const response = {
      title: 'string',
      description: 'string',
      latitude: 123,
      longitude: 321,
      id: '123',
    };
    const id = { id: '123' };

    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(response))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(await controller.getPoint(id.id)).toStrictEqual(response);
  });

  it('should update a Point', async () => {
    const id = '123';

    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(id))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(
      await controller.updatePoint({
        title: 'setor leste',
        description: 'setor leste',
        latitude: -16.0122492,
        longitude: -48.0550158,
      }),
    ).toStrictEqual(id);
  });

  it('Delete a point ', async () => {
    const id = { id: '123' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(true))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(await controller.deletePoint(id.id)).toBe(true);
  });

  it('Create a area ', async () => {
    const id = { id: '123' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(id))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(
      await controller.createArea({
        title: 'teste',
        description: 'teste',
        coordinates: [
          { latitude: 0, longitude: 0 },
          { latitude: 1, longitude: 1 },
          { latitude: 2, longitude: 2 },
        ],
      }),
    ).toBe(id);
  });

  it('Get a area ', async () => {
    const response = {
      title: 'teste',
      description: 'teste',
      coordinates: [
        { latitude: 0, longitude: 0 },
        { latitude: 1, longitude: 1 },
        { latitude: 2, longitude: 2 },
      ],
      id: '123',
    };
    const id = { id: '123' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(response))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(await controller.getArea(id.id)).toStrictEqual(response);
  });

  it('should update a area', async () => {
    const id = '123';

    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(id))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(
      await controller.updateArea({
        title: 'teste',
        description: 'teste',
        coordinates: [
          { latitude: 0, longitude: 0 },
          { latitude: 1, longitude: 1 },
          { latitude: 2, longitude: 2 },
        ],
      }),
    ).toStrictEqual(id);
  });

  it('Delete a area ', async () => {
    const id = { id: '123' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(true))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(await controller.deleteArea(id.id)).toBe(true);
  });

  it('should add midia to a point ', async () => {
    const midiaRelation = { locationId: '123', mediaId: '321' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(true))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(await controller.addMediaToPoint(midiaRelation)).toBe(true);
  });

  it('should remove midia from a point ', async () => {
    const midiaRelation = { locationId: '123', mediaId: '321' };
    const module = await customModule(
      jest.fn(() => new Observable((sub) => sub.next(true))),
    );

    controller = module.get<MapasController>(MapasController);

    expect(await controller.removeMediaFromPoint(midiaRelation)).toBe(true);
  });
});
